describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/register')
    // fill out a form field
cy.get('input[formControlName="username"]')
.type('cypresstest')
.get('input[formControlName="email"]')
.type('test@gg.com')
.get('input[formControlName="password"]')
.type('workpls')
/** fill out more form fields **/

// simulate clicking submit
cy.get('button[type=submit]')
.click()
  })
})