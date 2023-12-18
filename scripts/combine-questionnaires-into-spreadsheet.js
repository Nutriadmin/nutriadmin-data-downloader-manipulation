/* Executing this script will:
1. Read all client records you have downloaded from nutriadmin
2. Extract a specific questionnaire for each client
3. Combine all that data into a single CSV (spreadsheet) file
This is useful to compare multiple records at the same time. Check the README for instructions on how to use
*/
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter();

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
                        Object.assign(clientInfo, jsonData);
                    } catch (error) {
                        console.error(`Error reading JSON from file ${filePath}: ${error.message}`);
                    }
                }
            });

            // Add clientInfo to the clientData array
            clientData.push(clientInfo);
        }
    });

    return clientData;
}

function writeToCsv(outputFile, clientData) {
    const csvHeaders = Object.keys(clientData[0]) || [];
    const csvWriterInstance = csvWriter({
        path: outputFile,
        header: csvHeaders.map(header => ({ id: header, title: header })),
    });

    // Write data to CSV
    csvWriterInstance.writeRecords(clientData)
        .then(() => console.log(`CSV file '${outputFile}' generated successfully.`))
        .catch(error => console.error(`Error writing to CSV: ${error.message}`));
}

// Replace the path and questionnaireId with your actual values
const folderPath = '/path/to/clients/client-records';
const questionnaireId = 'your-questionnaire-id';
const outputFile = 'output.csv';

const clientData = processFolder(folderPath, questionnaireId);
writeToCsv(outputFile, clientData);
