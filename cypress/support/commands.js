// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', () => {
  cy.request({
    method: "POST",
    url: "/login/teacher",
    body: {
      msg: "loginTeacherSuccess",
      token: `0XSOMQEVJPTbBihMEw7X30FEDJtbi6vJrottHHMH4IUol6Y7mxXyvwtX5dpQ`,
      statusId: 1,
      name: `Carrie`,
      fullName: `CarrieBliss`,
      teacherId: 2,
      level: `teacher`
    }
  }).then(resp => {
    window.localStorage.setItem("newToken", resp.body.user.token);
  });
});


//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
