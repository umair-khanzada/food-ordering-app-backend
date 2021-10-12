#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Utility functions
const exec = util.promisify(require('child_process').exec);
async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    
  } catch {
    (error) => {
  
    };
  }
}

async function hasYarn() {
  try {
    await execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Validate arguments
if (process.argv.length < 3) {

  process.exit(1);
}

// Define constants
const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/hagopj13/node-express-boilerplate.git';

// Check if directory already exists
try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
  } else {
   
  }
  process.exit(1);
}

async function setup() {
  try {
    // Clone repo
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
  
    // Change directory
    process.chdir(appPath);

    // Install dependencies
    const useYarn = await hasYarn();
    
    if (useYarn) {
      await runCmd('yarn install');
    } else {
      await runCmd('npm install');
    }
  

    // Copy envornment variables
    fs.copyFileSync(path.join(appPath, '.env.example'), path.join(appPath, '.env'));
    

    // Delete .git folder
    await runCmd('npx rimraf ./.git');

    // Remove extra files
    fs.unlinkSync(path.join(appPath, 'CHANGELOG.md'));
    fs.unlinkSync(path.join(appPath, 'CODE_OF_CONDUCT.md'));
    fs.unlinkSync(path.join(appPath, 'CONTRIBUTING.md'));
    fs.unlinkSync(path.join(appPath, 'bin', 'createNodejsApp.js'));
    fs.rmdirSync(path.join(appPath, 'bin'));
    if (!useYarn) {
      fs.unlinkSync(path.join(appPath, 'yarn.lock'));
    }

    

  } catch (error) {
    
  }
}

setup();
