describe('Login page', () => {
  it('renders login form with all required fields', () => {
    cy.visit('/login')
    cy.get('h2').contains('Iniciar sesion')
    cy.get('input[name="email"]').should('exist').should('have.attr', 'type', 'email')
    cy.get('input[name="password"]').should('exist').should('have.attr', 'type', 'password')
    cy.get('button[type="submit"]').contains('Entrar')
  })

  it('has proper form structure with labels', () => {
    cy.visit('/login')
    cy.get('form').should('exist')
    cy.get('label').should('have.length', 2)
    cy.get('label').eq(0).contains('Email')
    cy.get('label').eq(1).contains('Password')
  })

  it('accepts and maintains email input value', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="email"]').should('have.value', 'user@example.com')
  })

  it('accepts and maintains password input value', () => {
    cy.visit('/login')
    cy.get('input[name="password"]').type('mypassword123')
    cy.get('input[name="password"]').should('have.value', 'mypassword123')
  })

  it('clears input correctly', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="email"]').clear()
    cy.get('input[name="email"]').should('have.value', '')
  })

  it('submit button is not disabled initially', () => {
    cy.visit('/login')
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  it('has placeholder text in email field', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').should('have.attr', 'placeholder', 'nombre@educastur.org')
  })

  it('has placeholder text in password field', () => {
    cy.visit('/login')
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Tu contraseña')
  })

  it('shows helper text about account creation', () => {
    cy.visit('/login')
    cy.contains('Si no tienes cuenta').should('exist')
  })

  it('has link to registration page', () => {
    cy.visit('/login')
    cy.get('a').contains('registrate aqui').should('exist')
    cy.get('a').contains('registrate aqui').should('have.attr', 'href', '/registro')
  })

  it('displays muted description text', () => {
    cy.visit('/login')
    cy.get('p.muted').contains('Accede con tu correo institucional').should('exist')
  })

  it('form fields are required', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').should('have.attr', 'required')
    cy.get('input[name="password"]').should('have.attr', 'required')
  })

  it('navigates to register via link', () => {
    cy.visit('/login')
    cy.get('a').contains('registrate aqui').click()
    cy.url().should('include', '/registro')
    cy.get('h2').contains('Registro')
  })

  it('page has correct title', () => {
    cy.visit('/login')
    cy.title().should('contain', 'Centro de Incidencias')
  })

  it('submit button text shows correct label', () => {
    cy.visit('/login')
    cy.get('button[type="submit"]').should('contain', 'Entrar')
  })

  it('form section is displayed correctly', () => {
    cy.visit('/login')
    cy.get('.centered-page').should('exist')
    cy.get('.panel-card').should('be.visible')
    cy.get('.form-card').should('exist')
  })
})
