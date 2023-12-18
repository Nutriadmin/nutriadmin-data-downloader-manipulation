/* Executing this script will:
1. Read all client records you have downloaded from nutriadmin
2. Extract a specific questionnaire for each client
3. Combine all that data into a single CSV (spreadsheet) file
This is useful to compare multiple records at the same time. Check the README for instructions on how to use
*/
const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function processFolder(folderPath, questionnaireId) {
    const clientData = [];

    // Read client folders
    const clientFolders = fs.readdirSync(folderPath);

    // Iterate through each client folder
    clientFolders.forEach(clientFolder => {
        const clientPath = path.join(folderPath, clientFolder);

        // Check if it's a directory
        if (fs.statSync(clientPath).isDirectory()) {
            const clientInfo = { "Client Name": clientFolder };

            // Iterate through files in the client folder
            const clientFiles = fs.readdirSync(clientPath);
            clientFiles.forEach(file => {
                const filePath = path.join(clientPath, file);

                // Check if it's a JSON file and contains the specified questionnaireId
                if (file.endsWith('.json') && file.includes(`questionnaire-${questionnaireId}`)) {
                    try {
                        // Read JSON file
                        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                        // Update clientInfo object with JSON data
                        Object.assign(clientInfo, {values: jsonData});
                    } catch (error) {
                        console.error(`Error reading JSON from file ${filePath}: ${error.message}`);
                    }
                }
            });

            // Add clientInfo to the clientData array
            if (clientInfo.values && clientInfo.values.length > 0) {
                clientData.push(clientInfo);
            }
        }
    });

    return clientData;
}

function getColumnHeaders (clientData) {
    const uniqueNames = Array.from(
        new Set(
            clientData.reduce((names, client) => {
                if (client.values && Array.isArray(client.values)) {
                    client.values.forEach(value => {
                        if (value.name) {
                            names.add(value.name);
                        }
                    });
                }
                return names;
            }, new Set())
        )
    );

    // Sort the unique names in natural order
    // uniqueNames.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    return uniqueNames;
}

function stringifyObjectValues(obj) {
    if (typeof obj === 'object' && obj !== null) {
        return JSON.stringify(obj);
    }
    return obj;
}


function writeToCsv(outputFile, clientData) {
    const csvHeaders = ['Client Name', ...getColumnHeaders(clientData)];
    const csvWriterInstance = createCsvWriter({
        path: outputFile,
        header: csvHeaders.map(header => ({ id: header, title: header })),
        append: false,
        flags: 'w'
    });

    // Prepare data for writing to CSV
    const csvRecords = clientData.map(client => {
        const record = { 'Client Name': client['Client Name'] };

        // Add values based on the headers
        csvHeaders.slice(1).forEach(header => {
            const valueObj = client.values.find(value => value.name === header);
            record[header] = valueObj ? stringifyObjectValues(valueObj.value) : '';
        });

        return record;
    });


    // Write data to CSV
    csvWriterInstance.writeRecords(csvRecords)
        .then(() => console.log(`CSV file '${outputFile}' generated successfully.`))
        .catch(error => console.error(`Error writing to CSV: ${error.message}`));
}

// Prompt user for questionnaireId
const questionnaireId = readline.question('Enter the questionnaire ID: ');

// Replace the folderPath and outputFile with your actual values
const folderPath = path.join(__dirname, '../input-data/client-records');
const outputFile = path.join(__dirname, '../output/combined-questionnaires.csv');

const clientData = processFolder(folderPath, questionnaireId);
writeToCsv(outputFile, clientData);
