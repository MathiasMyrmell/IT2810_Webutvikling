/// <reference types="cypress" />


describe('End2End_homepage', () => {
  it('vistit test site', () => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/project4c')

  })

  it('search for recipes', () => {
    cy.get('#searchField').type('chicken')
    cy.get('[data-testid="SearchIcon"]').click()
    cy.wait(1000) // wait for 1 second

  })

  it('click open on first recipe', () => {
    cy.get('.form-control').scrollIntoView()
    cy.get('.recipes').children().children().eq(1).children().eq(1).click()
  })

  it('check if ingredients contains chicken', () => {
    const first_result= cy.get('.recipes').children().children().eq(1)
    first_result.contains('chicken')
  })

  it('click close on first recipe', () => {
    // cy.get('.form-control').scrollIntoView()
    cy.get('.recipes').children().children().eq(1).children().eq(1).click()
  })

  //trykke på en av select ingrediensene -> trykk på en av oppskriftene -> sjekk at den inneholder ingrediensen
  it('Select on "beef" and check if recipe ingredients contians "beef"', () => {
    cy.get(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    const first_result = cy.get('.recipes').children().children().eq(1)
    first_result.children().eq(1).click()
    cy.get('.recipes').children().children().eq(1).contains('chicken')
    cy.get('.recipes').children().children().eq(1).contains('beef')
  })



})


describe('End2End_recipeMaker', () => {
  it('vistit test site', () => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/project4c')

  })

  //trykke på make recipes -> trykke på knapp for å lage recipe uten å legge til informasjon -> sjekk at du får feilmelding
  it('Click on "Make Recipes"', () => {
      cy.get('[href="/project4c/make%20recipe"]').click()
  })

  it('Check for error output', () => {
      cy.get('[data-testid="addRecipeButton"]').click()
      cy.get('.response').scrollIntoView().contains('Add all the necessary information!')
  })

  it('Add ingredients', () => {
      cy.get('#outlined-search').type('butter')
      cy.get('[data-testid="addIngredientButton"]').click()
      cy.get('ul').children().first().children().eq(0).contains('butter')
      cy.get('#outlined-search').type('salt')
      cy.get('[data-testid="addIngredientButton"]').click()
      cy.get('#outlined-search').type('pepper')
      cy.get('[data-testid="addIngredientButton"]').click()
      cy.wait(1000)
  })

  it('Remove ingredient', () => {
      cy.get('ul').children().eq(1).children().eq(0).contains('salt')
      cy.get('ul').children().eq(1).children().eq(1).click()
  })


})