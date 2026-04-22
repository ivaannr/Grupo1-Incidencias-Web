describe('Full app presentation flow - CRUD incidents and users', () => {
  it('creates, edits and deletes an incident and a user via the UI', () => {
    cy.login()
    cy.visit('/panel')
    cy.contains('Panel principal')

    const incidentTitle = `E2E Incident ${Date.now()}`
    cy.visit('/incidencias/nueva')
    cy.get('input[name="titulo"]').type(incidentTitle)
    cy.get('textarea[name="descripcion"]').type('Descripcion creada por test E2E')
    cy.get('select[name="categoria"]').select('Hardware')
    cy.get('select[name="nivel_urgencia"]').select('Alta')
    cy.get('input[name="ubicacion"]').type('Sala E2E')
    cy.get('button[type="submit"]').contains('Guardar incidencia').click()
    cy.url().should('include', '/incidencias')
    cy.contains(incidentTitle)

    cy.get('table').contains('td', incidentTitle).closest('tr').within(() => {
      cy.get('a.link-inline').contains('Ver detalle').click()
    })
    cy.location('pathname').should('match', /\/incidencias\/[0-9]+/)
    cy.get('input[name="titulo"]').should('have.value', incidentTitle)

    cy.get('select[name="estado"]').select('En Curso')
    cy.get('button').contains('Guardar cambios').click()
    cy.contains('Cambios guardados correctamente.').should('exist')

    cy.visit('/incidencias')
    cy.contains(incidentTitle)

    const userEmail = `e2e.user.${Date.now()}@example.com`
    cy.visit('/usuarios')
    cy.get('input[name="nombre"]').type('E2E User')
    cy.get('input[name="email"]').type(userEmail)
    cy.get('input[name="password"]').type('Secreto123')
    cy.get('select[name="rolId"]').then(($sel) => {
      if ($sel.find('option').length > 0) {
        cy.wrap($sel).select($sel.find('option').first().val())
      }
    })
    cy.get('button[type="submit"]').contains('Crear usuario').click()
    cy.contains('Usuario creado correctamente.').should('exist')

    cy.get('table').contains('td', userEmail).closest('tr').within(() => {
      cy.get('select').then(($s) => {
        const $opt = $s.find('option').last()
        if ($opt.length) {
          cy.wrap($s).select($opt.val())
        }
      })
    })
    cy.contains('Rol actualizado correctamente.').should('exist')

    cy.get('table').contains('td', userEmail).closest('tr').within(() => {
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true)
      })
      cy.get('button.btn-danger').click()
    })
    cy.contains('Usuario eliminado correctamente.').should('exist')

    cy.visit('/incidencias')
    cy.get('table').contains('td', incidentTitle).closest('tr').within(() => {
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true)
      })
      cy.get('button.btn-danger').click()
    })
    cy.contains(incidentTitle).should('not.exist')
  })
})
