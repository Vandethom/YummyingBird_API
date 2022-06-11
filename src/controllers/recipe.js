import mongoose from 'mongoose'
import { Recipe } from '../models/recipe.js'

class RecipeController {
	async createOne(req, res) {
		const { authorUuid, title, description, categories, preparationTime, ingredients, vegan, glutenFree, porkFree, steps, options, tools } = req.body
		const newRecipe = new Recipe({authorUuid, title, description, categories, preparationTime, ingredients, vegan, glutenFree, porkFree, steps, options, tools })

		try {
			const recipe = await Recipe.create(newRecipe)
			res.status(201).json(recipe)
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	async getAll (req, res) {
		try {
			const recipes = await Recipe.find()
        
        	res.status(200).json(recipes)
			console.log(recipes[1].tools)
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
    }
}

export default new RecipeController()
