describe('home page', () => {
  it('passes', () => {
    cy.wait(500)
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:4200')
    cy.wait(500)

    cy.contains('Exert Shop')
    cy.contains('Best Deals')
    cy.contains('Electronics')
    cy.contains('Collectibles')
    cy.contains('Clothing')
    cy.contains('Accessories')
    cy.contains('Home & Lifestyle')
    cy.contains('Office Supplies')

    cy.contains('Best Deals')
    cy.contains('LG 55" 4K UHD OLED TV')
    cy.contains('VIZIO 40" D-Series LED TV')
    cy.contains('Microsoft Surfacebook 4')
    cy.contains('S22 Ultra 5G')
    cy.contains('iPhone 14 Pro')

    cy.contains('Video Games')
    cy.contains('Nintendo Switch')
    cy.contains('Xbox Series X')
    cy.contains('Playstation 5')
    cy.contains('Playstation 4')
    cy.contains('GameCube')

    cy.contains('Video Games')
    .click()

    cy.wait(500)
    cy.url().should('eq', 'http://localhost:4200/category?id=11')

    cy.contains('Battlefield 2042')
  })
})