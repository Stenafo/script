const fs = require("fs");
const Papa = require("papaparse");
const validRoles = {
    "picture": [],
    "div": ["alert","alertdialog","application","document","log","marquee","status","timer"],
    "body": ["document"],
    "a": ["button","link"],
    "button": ["button"],
    "header": ["banner","complementary","contentinfo","form","main","navigation","search"]
};

fs.readFile("test.csv", "utf-8", (err, data) => {
    if (err) throw err;

    Papa.parse(data, {
        header: true,
        complete: results => {
            var output = results.data.map(row => {
                var element = row.snippet.match(/<([a-z]+)[^>]*>/)[1];
                var error = "";
                if (validRoles[element]) {
                    var role = row.snippet.match(/role=["']([^"']+)["']/);
                    if (role) {
                        role = role[1];
                        if (validRoles[element].indexOf(role) === -1) {
                            error = `Invalid role ${role} for element ${element}`;
                        }
                    }
                }
                return {
                    path: row.path,
                    snippet: row.snippet,
                    howToFix: error
                }
            });
            Papa.unparse(output, {
                header: true,
                quotes: true,
                quoteChar: '"',
                delimiter: ",",
                newline: "\r\n",
                escapeChar: "\\",
                encoding: "utf-8",
                download: true,
                filename: "test.output.csv"
            });
        }
    });
});
