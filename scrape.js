const fs = require('fs');
const Papa = require('papaparse');
const cheerio = require('cheerio');

//object containing valid roles for each element
const validRoles = {
  picture: [],
  div: ['region','alert','alertdialog','application','article','banner','button','checkbox','columnheader','combobox','complementary','contentinfo','definition','dialog','directory','document','feed','figure','form','grid','gridcell','group','heading','img','link','list','listbox','listitem','log','main','marquee','math','menu','menubar','menuitem','menuitemcheckbox','menuitemradio','navigation','note','option','presentation','progressbar','radio','radiogroup','range','region','roletype','row','rowgroup','rowheader','scrollbar','search','searchbox','separator','slider','spinbutton','status','tab','table','tablist','tabpanel','textbox','timer','toolbar','tooltip','tree','treegrid','treeitem'],
  body: ['document','application'],
  header: ['banner','complementary','contentinfo','form','main','navigation','search'],
  article: ['article','document','application','main'],
  nav: ['navigation','directory','list','listitem','listbox','menu','menubar','menuitem','menuitemcheckbox','menuitemradio','tablist','tabpanel','toolbar'],
  aside: ['complementary','note','search','status']
};

function checkSnippet(snippet) {
  //create a new DOM element using cheerio
  const $ = cheerio.load(snippet);
  const element = $('*')[0];
  const elementName = element.name;

  if (!validRoles[elementName]) {
    return "This element does not have a role";
  }
  const role = element.attribs.role;
  if (!validRoles[elementName].includes(role)) {
    return "This element does not have a valid role";
  }
  return "";
}

//parse the csv file
Papa.parse("test.csv", {
  header: true,
  complete: function(results) {
    const data = results.data;
    //iterate over rows of the csv
    data.forEach((row) => {
      const howToFix = checkSnippet(row["Snippet"]);
      row["How to fix"] = howToFix;
    });
    //stringify the modified data and write to a new csv file
    const csvData = Papa.unparse(data);
    fs.writeFileSync("test-output.csv", csvData);
  }
});
