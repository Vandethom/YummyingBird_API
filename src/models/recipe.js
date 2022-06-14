import mongoose from 'mongoose'
import { uuid as v4 } from 'uuidv4'


const recipeSchema = new mongoose.Schema({
	uuid: { 
		type: String, 
		default: function generateUuid() {
			return v4()
		}
	},
	authorUuid: { type: String },

	title: String,
	description: String,
	categories: [String],
	preparationTime: Number,
	ingredients: [String],

	vegan: Boolean,
	glutenFree: Boolean,
	porkFree: Boolean,

	steps: [String],
	options: [String],
	tools: [String],
	imageUrl: String,

	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
})

const Recipe = mongoose.model('Recipe', recipeSchema)
export {Recipe}
