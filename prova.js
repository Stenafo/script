const fs = require('fs');
const cheerio = require('cheerio');
const validRoles = {
    "picture": [], 
    "body":["document"], 
    //... add more roles here
};

fs.readFile('file.csv', 'utf8', (err, data) => {
    if (err) throw err;

    const lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) { // start at 1 to skip the header row
        const columns = lines[i].split(',');
        const html = columns[1];
        const $ = cheerio.load(html);

        const element = $('*').get(0).name;
        const classList = $('*').attr('class');
        const roles = $('*').attr('role');
        if (!validRoles[element]) {
            console.log(`Error at line ${i}: element ${element} is not valid`);
        }
        // check if the roles are valid for the element
        for (let j = 0; j < roles.length; j++) {
            if (!validRoles[element].includes(roles[j])) {
                console.log(`Error at line ${i}: role ${roles[j]} is not valid for element ${element}`);
            }
        }
    }
});
