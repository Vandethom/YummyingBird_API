import { RoutesConfig } from './routesConfig.js'
import AuthController from '../controllers/auth.js'


export class AuthRoutes extends RoutesConfig {
	constructor(app) {
		super(app, 'AuthRoutes')
	}

    configureRoutes() {
        this.app.route('/login').post([AuthController.login])
        this.app.route('/signup').post([AuthController.signup])

        return this.app
    }
}
