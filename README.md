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
1. Install Node (check prerequisites above)
2. Copy this entire project to your Desktop for ease of use
3. Download all your `client data` as [shown here](In particular, please check [this article](https://nutriadmin.com/docs/how-to-download-all-of-your-client-data-in-bulk) on how to download your data)
4. Unzip the data using the one-time password received via email
5. You will now have a folder with name `data-user-<id>-<date>` where <id> and <date> are alphanumeric sequences
6. Open that folder containing your data and navigate to clients > client-records
7. Copy the `client-records` folder in your clipboard
8. In this project, navigate to the `input-data` folder
9. Delete any contents inside the `input-data` folder (including the .gitkeep file if it's there) to ensure it's empty
10. Paste from your clipboard the client-records folder. Your `input-data` folder now should contain a copy of the `client-records` folder. This folder, in turn, will contain multiple folders (one per client) with all your client data.
11. With the preparations above complete, please open a terminal window in your computer
    - In Mac, press `cmd+space` and type `terminal`
    - In Windows, press the `Windows key`, then type `Powershell`
12. Navigate to this project in your terminal session by typing the appropriate command (your folder for this project has to be in Desktop):
    - In Mac, you need to type: `cd ~/Desktop/nutriadmin-data-downloader-manipulation` then press `ENTER`
    - In Windows Powershell, you need to type: `cd $env:USERPROFILE\Desktop\nutriadmin-data-downloader-manipulation` then press `ENTER`
13. Once your terminal session is at the `nutriadmin-data-downloader-manipulation` directory, where you have this project, you need to run this script with NodeJS to execute it
    - In Mac, you need to type: `npm i && node ./scripts/combine-questionnaires-into-spreadsheet.js` then press `ENTER`
    - In Windows, you need to type `npm i ; node .\scripts\combine-questionnaires-into-spreadsheet.js` then press `ENTER`
14. Please check the terminal in case any errors occur. If there are no errors your data will now be available inside the `output` folder
