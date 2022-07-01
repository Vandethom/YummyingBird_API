import mongoose from 'mongoose'
import { Recipe } from '../models/recipe.js'

class RecipeController {
	async createOne(req, res) {
		const recipe = req.body
		const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file}`
		const newRecipe = new Recipe({...recipe, imageUrl: imageUrl})

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
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
    }
}

export default new RecipeController()
 