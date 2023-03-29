describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://localhost:4200/login')
        // fill out a form field
        cy.get('input[formControlName="username"]')
        .type('cypresstest')
        .get('input[formControlName="password"]')
        .type('workpls')

        cy.get('button[type=submit]')
        .click()

        cy.visit('http://localhost:4200/profile?user=40', {timeout: 60000})
        cy.contains('#profile-header', 'Charades')
    })
  })