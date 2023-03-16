require('dotenv').config();
const fs = require('fs');
const apiUrl = process.env.API_URL;
const fileSrc = './src/assets/apiUrl.json';

if (!!!apiUrl) {
  console.info('-----------------------');
  console.info('WARNING MISSING APP URL');
  console.info('-----------------------');
} else {
  fs.writeFileSync(fileSrc, JSON.stringify({ apiUrl }));
  const fileContent = fs.readFileSync(fileSrc);
  console.log('<----------------------------->');
  console.info('Successfully wrote api file');
  console.log(JSON.parse(fileContent));
  console.log('<----------------------------->');
}
