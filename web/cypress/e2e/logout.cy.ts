describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:4200/login', {timeout: 6000})
      // fill out a form field
      cy.get('input[formControlName="username"]')
      .type('cypresstest')
      .get('input[formControlName="password"]')
      .type('workpls')
      /** fill out more form fields **/

      // simulate clicking submit
      cy.get('button[type=submit]').click()
      cy.wait(500)
      cy.visit('http://localhost:4200/profile?user=40', {timeout: 6000})
      cy.wait(500)
      cy.contains('account_circle').click()
      cy.wait(500)
      cy.contains('Logout').click()
      cy.wait(500)

    })
  })