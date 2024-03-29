describe('template spec', () => {
    it('passes', () => {
        cy.wait(500)
        cy.visit('http://localhost:4200/login')
        cy.wait(500)
        // fill out a form field
        cy.wait(500)
        cy.get('input[formControlName="username"]')
        .type('cypresstest')
        .get('input[formControlName="password"]')
        .type('workpls')
        cy.wait(500)
        cy.get('button[type=submit]')
        .click()
        cy.wait(500)
        cy.visit('http://localhost:4200/profile?user=3', {timeout: 60000})
        cy.contains('#profile-header', 'Charades')
    })
  })