import {writeFile} from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
    production: true,
    petfinderApiKey: '${process.env['petfinderApiKey']}',
    petfinderApiSecret: '${process.env['petfinderApiSecret']}',
    petfinderVersion: 2,
    petfinderBaseUrl: 'https://api.petfinder.com',
    apiUrl: 'https://app-pawssierapi.azurewebsites.net'
  };
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
