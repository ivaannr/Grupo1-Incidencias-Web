const SESSION_KEY = 'incidencias_session_user'

Cypress.Commands.add('login', (user) => {
	cy.fixture('sessionUser').then((fixtureUser) => {
		const sessionUser = user || fixtureUser
		cy.session(['incidencias_session', sessionUser.email], () => {
			cy.visit('/', {
				onBeforeLoad(win) {
					win.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
				}
			})
		})
	})
})