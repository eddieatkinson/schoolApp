describe("mocking route responses", () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '/teachers', {
      msg: "loginTeacherSuccess",
      token: `0XSOMQEVJPTbBihMEw7X30FEDJtbi6vJrottHHMH4IUol6Y7mxXyvwtX5dpQ`,
      statusId: 1,
      name: `Carrie`,
      fullName: `Carrie Bliss`,
      teacherId: 2,
      level: `teacher`
    }).as('teacher')
    cy.visit("/teachers");
  });

  it("loads the calendar", () => {
    cy.get('[href="/teachers/calendar"] > :nth-child(1) > .__rsnav___item').click();

    cy.get(".logoBlocks").should('exist')
    cy.log(Cypress.Server.defaults())
  });

  it('loads courses', () => {
    cy.route('GET', '/teacher/courses', {
      msg: "loginTeacherSuccess",
      token: `0XSOMQEVJPTbBihMEw7X30FEDJtbi6vJrottHHMH4IUol6Y7mxXyvwtX5dpQ`,
      statusId: 1,
      name: `Carrie`,
      fullName: `Carrie Bliss`,
      teacherId: 2,
      level: `teacher`
    })
    cy.visit('/teacher/courses')
    // cy.get("#courses > :nth-child(1) > .__rsnav___item").click()


  });
});

