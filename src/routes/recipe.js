import { RoutesConfig } from './routesConfig.js'
import RecipeController from '../controllers/recipe.js'


export class RecipeRoutes extends RoutesConfig {
	constructor(app) {
		super(app, 'RecipeRoutes')
	}

	configureRoutes() {
		// this.app.route('/recipe/:uuid').get([RecipeController.getOneRecipe])
		// this.app.route('/recipe/category/:id').get([RecipeController.getRecipesByCategory])
		this.app.route('/recipes').get([RecipeController.getAll])

		this.app.route('/recipe').post([/* JWT.verifyToken ,*/ RecipeController.createOne])

		// this.app.route('/recipe/:uuid').put([JWT.verifyToken, RecipeController.updateRecipe])

		// this.app.route('/recipe/:uuid').delete([JWT.verifyToken, RecipeController.deleteRecipe])

		return this.app
	}
}