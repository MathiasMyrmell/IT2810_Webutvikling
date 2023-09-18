/// <reference types="cypress" />


describe('End2End_Test', () => {
  it('vistit test site', () => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/project3')

  })

  it('search for recipes', () => {
    cy.get('#searchField').type('chicken')
    cy.wait(1000) // wait for 1 second

  })

  it('click open on first recipe', () => {
    cy.get('.form-control').scrollIntoView()
    cy.get('.recipes').children().eq(1).children().eq(1).click()
  })

  it('click close on first recipe', () => {
    // cy.get('.form-control').scrollIntoView()
    cy.get('.recipes').children().eq(1).children().eq(1).click()
  })

  //trykke på en av select ingrediensene -> trykk på en av oppskriftene -> sjekk at den inneholder ingrediensen
  it('Select on "beef" and check if recipe ingredients contians "beef"', () => {
    cy.get(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    cy.get('.recipes').children().eq(1).children().eq(1).click()
    cy.get('.MuiCollapse-wrapperInner > .MuiCardContent-root').children().eq(1).filter(':contains("beef")')
  })

  //trykke på make recipes -> trykke på knapp for å lage recipe uten å legge til informasjon -> sjekk at du får feilmelding
  it('Click on "Make Recipes"', () => {
    cy.get(':nth-child(2) > a').click()
  })

  it('Check for error output', () => {
    cy.get('.css-1qvsg2w-MuiButtonBase-root-MuiButton-root').click()
    cy.get('.response').contains('Add all the necessary information!')
  })

})
