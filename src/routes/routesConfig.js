

export class RoutesConfig {
	constructor(app, name) {
		this.app = app
		this.name = name
		this.configureRoutes()
	}

	getName() {
		return this.name
	}

    configureRoutes() {}
}
