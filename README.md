# Introduction 
This project contains a variety of scripts to perform useful data operations involving data downloaded from NutriAdmin. You can learn more about [NutriAdmin here](https://nutriadmin.com).
In particular, please check [this article](https://nutriadmin.com/docs/how-to-download-all-of-your-client-data-in-bulk) on how to download your data.

# Prerequisites
In order to run this code you will need to install the following free tools in your Windows/Linux/Mac computer:
- [NodeJS](https://nodejs.org/)

# Disclaimer
Running code in your computer can be dangerous! Please ensure you understand what the code will do before you execute it. If you are not a developer, and you are running code in your computer that you don't understand, this can result in unintended data loss or corruption.
These tools are provided as a useful addition and examples on how to manipulate data you download from the software.
NutriAdmin is not responsible for any unintended side effects running these scripts may have in your computer or data. Please double-check and make sure you know what you are doing before you execute the code. 

# Scripts
Here are instructions on how to run the different scripts.

## combine-questionnaires-into-spreadsheet.js
Follow these steps to combine data into a single file:
1. Copy this entire project to your Desktop for ease of use
2. Download all your `client data` as [shown here](In particular, please check [this article](https://nutriadmin.com/docs/how-to-download-all-of-your-client-data-in-bulk) on how to download your data)
3. Unzip the data using the one-time password received via email
4. You will now have a folder with name `data-user-<id>-<date>` where <id> and <date> are alphanumeric sequences
5. Open that folder containing your data and navigate to clients > client-records
6. Copy the `client-records` folder in your clipboard
7. In this project, navigate to the `input-data` folder
8. Delete any contents inside the `input-data` folder (including the .gitkeep file if it's there) to ensure it's empty
9. Paste from your clipboard the client-records folder. Your `input-data` folder now should contain a copy of the `client-records` folder. This folder, in turn, will contain multiple folders (one per client) with all your client data.
10. With the preparations above complete, please open a terminal window in your computer
    - In Mac, press `cmd+space` and type `terminal`
    - In Windows, press the `Windows key`, then type `Powershell`
11. Navigate to the Desktop in your terminal session by typing the appropriate command:
    - In Mac, you need to type: `cd ~/Desktop` then press `ENTER`
    - In Windows Powershell, you need to type: `cd $env:USERPROFILE\Desktop` then press `ENTER`
13. Once your terminal session is at the Desktop directory, where you have this project, you need to run this script with NodeJS to execute it
    - In Mac, you need to type: `npm i && node ./nutriadmin-data-downloader-manipulation/scripts/combine-questionnaires-into-spreadsheet.js` then press `ENTER`
    - In Windows, you need to type `npm i && node .\nutriadmin-data-downloader-manipulation\scripts\combine-questionnaires-into-spreadsheet.js` then press `ENTER`
13. Please check the terminal in case any errors occur. If there are no errors your data will now be available inside the `output` folder
