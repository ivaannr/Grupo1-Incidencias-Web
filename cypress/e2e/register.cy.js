describe('Register page', () => {
  it('displays registration form with all required fields', () => {
    cy.visit('/registro')
    cy.get('h2').contains('Registro')
    cy.get('input[name="nombre"]').should('exist').should('have.attr', 'type', 'text')
    cy.get('input[name="email"]').should('exist').should('have.attr', 'type', 'email')
    cy.get('input[name="password"]').should('exist').should('have.attr', 'type', 'password')
    cy.get('button[type="submit"]').contains('Crear cuenta')
  })

  it('has three labels for form fields', () => {
    cy.visit('/registro')
    cy.get('label').should('have.length', 3)
    cy.get('label').eq(0).contains('Nombre')
    cy.get('label').eq(1).contains('Email')
    cy.get('label').eq(2).contains('Password')
  })

  it('accepts nombre input correctly', () => {
    cy.visit('/registro')
    cy.get('input[name="nombre"]').type('Juan Perez')
    cy.get('input[name="nombre"]').should('have.value', 'Juan Perez')
  })

  it('accepts email input correctly', () => {
    cy.visit('/registro')
    cy.get('input[name="email"]').type('juan@example.com')
    cy.get('input[name="email"]').should('have.value', 'juan@example.com')
  })

  it('accepts password input correctly', () => {
    cy.visit('/registro')
    cy.get('input[name="password"]').type('SecurePass123')
    cy.get('input[name="password"]').should('have.value', 'SecurePass123')
  })

  it('shows password validation error when less than 6 chars', () => {
    cy.visit('/registro')
    cy.get('input[name="password"]').type('12345')
    cy.get('p.error-text').should('contain', 'La contraseña debe tener al menos 6 caracteres')
  })

  it('hides validation error when password reaches 6 chars', () => {
    cy.visit('/registro')
    cy.get('input[name="password"]').type('12345')
    cy.get('p.error-text').should('exist')
    cy.get('input[name="password"]').type('6')
    cy.get('p.error-text').should('not.exist')
  })

  it('submit button is disabled when password is too short', () => {
    cy.visit('/registro')
    cy.get('input[name="nombre"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('12345')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('submit button is not disabled when password is 6+ chars', () => {
    cy.visit('/registro')
    cy.get('input[name="nombre"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  it('shows role information message', () => {
    cy.visit('/registro')
    cy.contains('Tu cuenta se crea con rol comun por defecto').should('exist')
  })

  it('displays role description', () => {
    cy.visit('/registro')
    cy.get('p.muted').contains('rol comun').should('exist')
  })

  it('has link to login page', () => {
    cy.visit('/registro')
    cy.get('a').contains('Inicia sesion').should('exist')
    cy.get('a').contains('Inicia sesion').should('have.attr', 'href', '/login')
  })

  it('navigates to login via link', () => {
    cy.visit('/registro')
    cy.get('a').contains('Inicia sesion').click()
    cy.url().should('include', '/login')
    cy.get('h2').contains('Iniciar sesion')
  })

  it('shows link text about existing account', () => {
    cy.visit('/registro')
    cy.contains('¿Ya tienes cuenta?').should('exist')
  })

  it('clears input values correctly', () => {
    cy.visit('/registro')
    cy.get('input[name="nombre"]').type('Test').clear()
    cy.get('input[name="nombre"]').should('have.value', '')
  })

  it('form fields are required', () => {
    cy.visit('/registro')
    cy.get('input[name="nombre"]').should('have.attr', 'required')
    cy.get('input[name="email"]').should('have.attr', 'required')
    cy.get('input[name="password"]').should('have.attr', 'required')
  })

  it('page title is correctly set', () => {
    cy.visit('/registro')
    cy.title().should('contain', 'Centro de Incidencias')
  })

  it('form section is displayed correctly', () => {
    cy.visit('/registro')
    cy.get('.centered-page').should('exist')
    cy.get('.panel-card').should('be.visible')
    cy.get('.form-card').should('exist')
  })
})
