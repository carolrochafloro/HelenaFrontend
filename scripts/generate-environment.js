const fs = require('fs');
const path = require('path');

const backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
  console.error('ERROR: BACKEND_URL não está definido. Defina a variável de ambiente antes do build.');
  process.exit(1);
}

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.production.ts');
const fileContent = `export const environment = {
  production: true,
  apiUrl: '${backendUrl}',
};
`;

fs.writeFileSync(targetPath, fileContent, { encoding: 'utf8' });
console.log(`Arquivo de ambiente gerado: ${targetPath}`);
