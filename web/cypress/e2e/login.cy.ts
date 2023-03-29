describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/login')
    cy.wait(500)
    // fill out a form field
    cy.get('input[formControlName="username"]')
    .type('cypresstest')
    .get('input[formControlName="password"]')
    .type('workpls')
    /** fill out more form fields **/

    // simulate clicking submit
    cy.get('button[type=submit]').click()
    cy.wait(500)

    cy.contains('#profile-header', 'Welcome back, cypresstest')
    cy.wait(500)

    cy.getCookie('token')
    .should('exist')
    .then((c) => {
      cy.log('cookie exists')
    })
  })
})