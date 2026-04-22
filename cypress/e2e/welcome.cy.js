describe('Welcome page unauthenticated', () => {
  it('displays welcome content with all elements visible', () => {
    cy.visit('/')
    cy.contains('SISTEMA INTERNO').should('be.visible')
    cy.contains('Gestion de incidencias del centro').should('be.visible')
    cy.get('.welcome-page').should('exist')
    cy.get('.welcome-card').should('be.visible')
    cy.get('.welcome-logo').should('be.visible')
    cy.get('.eyebrow').contains('SISTEMA INTERNO')
    cy.get('p').contains('Registra problemas, prioriza tareas').should('exist')
  })

  it('has proper structure and styling', () => {
    cy.visit('/')
    cy.get('.welcome-card').should('have.class', 'panel-card')
    cy.get('.brand-with-icon').should('exist')
    cy.get('h1').should('contain', 'Gestion de incidencias del centro')
    cy.get('img.welcome-logo').should('have.attr', 'alt')
  })

  it('displays exactly two action buttons with correct text', () => {
    cy.visit('/')
    cy.get('.actions-row .btn').should('have.length', 2)
    cy.get('.btn').contains('Iniciar sesion').should('be.visible').should('have.class', 'btn')
    cy.get('.btn').contains('Crear cuenta').should('be.visible').should('have.class', 'btn-ghost')
  })

  it('buttons are clickable and properly styled', () => {
    cy.visit('/')
    cy.get('.btn').contains('Iniciar sesion').should('not.be.disabled')
    cy.get('.btn').contains('Crear cuenta').should('not.be.disabled')
  })

  it('navigates to login when clicking login button', () => {
    cy.visit('/')
    cy.get('.btn').contains('Iniciar sesion').click()
    cy.url().should('include', '/login')
    cy.get('h2').contains('Iniciar sesion')
    cy.get('form').should('exist')
  })

  it('navigates to register when clicking create account button', () => {
    cy.visit('/')
    cy.get('.btn').contains('Crear cuenta').click()
    cy.url().should('include', '/registro')
    cy.get('h2').contains('Registro')
    cy.get('form').should('exist')
  })

  it('logo has correct src and alt attributes', () => {
    cy.visit('/')
    cy.get('.welcome-logo').should('have.attr', 'src', '/img/n1circle.png')
    cy.get('.welcome-logo').should('have.attr', 'alt', 'Icono numero 1')
  })

  it('page title is correctly set', () => {
    cy.visit('/')
    cy.title().should('contain', 'Centro de Incidencias')
  })

  it('back button works after navigation', () => {
    cy.visit('/')
    cy.get('.btn').contains('Iniciar sesion').click()
    cy.url().should('include', '/login')
    cy.go('back')
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    cy.contains('Gestion de incidencias del centro')
  })

  it('register link accessible and functional', () => {
    cy.visit('/')
    cy.get('.btn.btn-ghost').contains('Crear cuenta').should('have.attr', 'href', '/registro')
    cy.get('.btn.btn-ghost').contains('Crear cuenta').click()
    cy.url().should('include', '/registro')
  })
})
