const validRoles = {
  "div": ["region", "alert"],
  "picture": [],
  "body": ["document"],
  ...
}

const Papa = require("papaparse");

const csvFile = "path/to/your/file.csv";

Papa.parse(csvFile, {
  header: true,
  complete: function(results) {
    let errors = [];
    for(let i = 0; i < results.data.length; i++) {
      let element = results.data[i]["snippet"].match(/<([a-z]+)/)[1];
      let role = results.data[i]["snippet"].match(/role="(.*?)"/);
      if(role){
        role = role[1];
        if(validRoles[element] && validRoles[element].indexOf(role) === -1){
          errors.push({
            "path": results.data[i]["path"],
            "snippet": results.data[i]["snippet"],
            "error": "Invalid role '" + role + "' for element '" + element + "'"
          });
        }
      }
    }
    console.log(errors);
  }
});
