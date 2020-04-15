const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const eventsFile = path.join(__dirname, `/data/events.yaml`)
const templateFile = path.join(__dirname, `/index.html.tpl`)
const publicFile = path.join(__dirname, `../public/index.html`)

const eventsData = yaml.load(fs.readFileSync(eventsFile, 'utf8'));
const templateHtml = fs.readFileSync(templateFile,'utf8');

eventsList = eventsData.map(event => `
<li class="${event.climate}">
  <h3><a href="${event.url}">${event.title}</a></h3>
  <div>${event.about}</div>
</li>
`);

let newHtml = templateHtml;

newHtml = newHtml.replace(
  '{TIMELINE}',
  `<ul>${eventsList.join('\n')}</ul>`
);

fs.writeFileSync(publicFile, newHtml, 'utf8');
