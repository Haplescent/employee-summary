const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern").default;
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const renderThis = [];

inquirerAboutEmployee = function (num) {
  return inquirer
    .prompt([
      {
        name: `name`,
        message: `
      What is this employee's name?`,
      },
      {
        name: `email`,
        message: `
      What is this employee's email?`,
      },
    ])
    .then((answer) => {
      console.log(answer);
    })
    .catch((err) => {
      throw err;
    });
};
inquirerAboutManager = function (num) {
  inquirerAboutEmployee(num).then((employeeResponse) => {
    inquirer
      .prompt([
        {
          name: `OfficeNum`,
          message: `
        What is this Manager's Office Number?`,
        },
      ])
      .then((managerResponse) => {
        return { ...employeeResponse, ...managerResponse };
      })
      .then((finalResponse) => {
        console.log(finalResponse);
      });
  });
};
inquirerAboutEngineer = function (num) {
  inquirerAboutEmployee(num);
};
inquirerAboutIntern = function (num) {
  inquirerAboutEmployee(num);
};
inquirerAboutNum = function (element) {
  inquirer
    .prompt([
      {
        type: "number",
        name: `num`,
        message: `
      How many ${element}s are on the team`,
      },
    ])
    .then((NumAnswer) => {
      console.log(`There are ${NumAnswer.num} ${element}s on the team`);
      if (element === "Manager") {
        inquirerAboutManager(NumAnswer.num);
      } else if (element === "Engineer") {
        inquirerAboutEngineer(NumAnswer.num);
      } else if (element === "Intern") {
        inquirerAboutIntern(NumAnswer.num);
      }
    })
    .catch((err) => {
      throw err;
    });
};

inquirer
  .prompt([
    {
      name: "intro",
      message: `
Employee Summary Command Line Interface will 
prompt you with questions about your 
Software Team and generate an HTML document 
to display on your website. Press Enter to 
begin`,
    },
    {
      type: "list",
      name: "employee",
      message: `
Which role on your team would you like to start?`,
      choices: ["Manager", "Engineer", "Intern"],
    },
  ])
  .then((choice) => {
    console.log(choice);
    inquirerAboutNum(choice.employee);
  })
  .catch((error) => {
    throw error;
  });
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
