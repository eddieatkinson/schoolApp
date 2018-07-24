describe('Loggin in', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('logs in as teacher', () => {

    it('logs in with correct credentials', () => {
      cy.get('[data-cy=teacher] > li > a').click({ force: true })
      cy.get('#Email')
        .type('carrie@carrie.com')
      cy.get('#password')
        .type('c')
      cy.get('.loginForm > span > .btn').click()
      cy.location('pathname').should('eq', '/teachers')
    })
  })

  context('logs in as parent', () => {
    it('logs in with correct credentials', () => {
      cy.get('[data-cy=parent] > li > a').click({ force: true })
      cy.get('#Email')
        .type('maggie@maggie.com')
      cy.get('#password')
        .type('m')
      cy.get('.loginForm > span > .btn').click()
      cy.location('pathname').should('eq', '/parents')
    })

  })

  context('logs in with correct credentials', () => {
    it('logs in user', () => {
      cy.get('[data-cy=student] > li > a').click({ force: true })
      cy.get('#Username')
        .type('alex')
      cy.get('#password')
        .type('a')
      cy.get('.loginForm > span > .btn').click()
      cy.location('pathname').should('eq', '/students')
    })
  })

  context('check for errors', () => {
    it('throws error with bad login credentials', () => {
      cy.get('[data-cy=teacher] > li > a').click({ force: true })
      cy.get('#Email')
        .type('julie@julie.com')
      cy.get('#password')
        .type('j')
      cy.get('.loginForm > span > .btn').click()
      cy.contains('h5', 'Invalid Login').should('exist')
    })

    it('requires valid email', () => {
      cy.get('[data-cy=parent] > li > a').click({ force: true })
      cy.get('#Email')
        .type('elyse.com')
      cy.get('#password')
        .type('e')
      cy.get('.loginForm > span > .btn').click()
      cy.contains('h5', 'Invalid Login')
      cy.get('#Email').should('have.css', 'border-bottom')
        .and('equal', '1px solid rgb(244, 67, 54)')
    })

    it('throws bad password error', () => {
      cy.get('[data-cy=student] > li > a').click({ force: true })
      cy.get('#Username')
        .type('mallory')
      cy.get('#password')
        .type('j')
      cy.get('.loginForm > span > .btn').click()
      cy.contains('h5', 'Incorrect Password').should('exist')
    })
  })
})

