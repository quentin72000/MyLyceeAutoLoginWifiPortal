# ⚠️ Abandoned project ⚠️
## As we find out that there was another more pratical method, this project is useless.
## Feel free to create a fork if you need it.

# MySchoolPortalAutoLoginScript
This project auto-login into "invite" mode of my school captive login portal.

## How to use
Run the `install.bat` script to install dependencies and  the run the `start.vbs` to start the script.

## Compiled version
You can find the compiled (.exe) version on the [release page](https://github.com/quentin72000/MySchoolPortalAutoLoginScript/releases/).

Please note that the structure of the folder is **important** and all files are **necessary** as puppeteer can't be compiled.

## How to compile yourself

Install Node.JS and install nexe with `npm install nexe`.
Then install dev dependencies of the script by running `npm i --production=false` in the script folder.
You will also need tools that are described [here](https://github.com/nodejs/node/blob/v12.x/BUILDING.md).

Just run `npm run build` and the files will be in the build directory.
Make sure to **keep all the content of the directory** to make the .exe work properly as puppeteer can't be compiled.
