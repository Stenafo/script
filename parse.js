let validRoles = {
  "picture": [],
  "div": ["group", "region"],
  "body": ["document"]
};

// Carica il file CSV in una matrice di oggetti
let instances = Papa.parse(csv).data;

// Rimuovi l'intestazione della tabella
instances.shift();

// Analizza ogni riga del file CSV
let errors = instances.map(row => {
  let [path, snippet, howtofix] = row;
  let element = snippet.match(/<([a-z]+)/)[1];
  if (!validRoles[element]) {
    return;
  }
  let role = snippet.match(/role="([a-z]+)"/);
  if (!role) {
    return;
  }
  role = role[1];
  if (validRoles[element].indexOf(role) === -1) {
    return {path, snippet, howtofix: `Invalid role "${role}" for element "${element}"`};
  }
}).filter(row => row);
console.log(errors);
