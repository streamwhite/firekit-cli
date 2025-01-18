#!/usr/bin/env node

import { execSync } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import process from 'node:process';
const program = new Command();

program
  .name('quick-fire')
  .description('CLI tool to quick setup firebase projects and web apps')
  .version('1.0.0');

program
  .command('setup <projectId> <appName>')
  .description('Login, create project, create web app, and get SDK config')
  .action((projectId, appName) => {
    try {
      console.log('Logging in to Firebase...');
      execSync('firebase login', { stdio: 'inherit' });

      const projectsList = JSON.parse(
        execSync('firebase projects:list --json', { encoding: 'utf-8' })
      ).result;

      const projectExists = projectsList.some(
        (project) => project.projectId === projectId
      );
      const uniqueProjectId = projectId + '-' + Date.now();
      if (!projectExists) {
        console.log(`Creating Firebase project: ${uniqueProjectId}...`);
        execSync(`firebase projects:create ${uniqueProjectId}`, {
          stdio: 'inherit',
        });
      } else {
        console.log(
          `it will create web app with existed Firebase project ${projectId}`
        );
      }

      console.log(`Creating Firebase web app: ${appName}...`);
      execSync(
        `firebase apps:create WEB ${appName} --project ${uniqueProjectId}`,
        {
          stdio: 'inherit',
        }
      );
      const appId = JSON.parse(
        execSync(`firebase apps:list --project ${uniqueProjectId} --json`, {
          encoding: 'utf-8',
        })
      ).result.find((app) => app.displayName === appName).appId;

      console.log('Fetching web app SDK configuration...');
      // firebase apps:sdkconfig WEB 1:981439365318:web:f8d0990e8d386a1f5b57c7
      const configOutput = execSync(`firebase apps:sdkconfig WEB ${appId}`, {
        encoding: 'utf-8',
      });
      const regex = /firebase\.initializeApp\((\{[\s\S]*?\})\);/;

      const config = configOutput.match(regex)[1];
      // save config to a json file
      fs.writeFileSync('app-config.json', config);

      // show the config is saved
      console.log(
        '\n\n',
        '🎉🎉🎉SDK configuration saved to app-config.json🎉🎉🎉'
      );
    } catch (error) {
      console.error('Error during setup:', error.message);
    }
  });

program.parse(process.argv);

// doc: add project id default value
// doc: projectId new project name or existing project id, it will add utc time to the project id, use a meaningful name(no prd test like)
