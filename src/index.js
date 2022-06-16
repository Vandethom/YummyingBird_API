import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

import { AuthRoutes } from './routes/auth.js'
import { RecipeRoutes } from './routes/recipe.js'


dotenv.config()

const db = process.env.DB_CONNECT_STRING
const app = express()
const host = '0.0.0.0' || 'localhost'
const port = process.env.PORT || 5000

mongoose.connect(db)
	.then(() => console.log('Connected to YummyingBird on MongoDB.'))
	.catch(() => console.log('Failed to connect to MongoDB.'))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// console.log('directory-name 👉️', __dirname)
const routes = []

// Restrict all routes to only 100 requests per IP address every 10 minutes
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,    // 10 minutes
	max: 100                     // 100 requests per IP
})


app.use(
	express.static(__dirname),
	helmet(),
	cors(),
	express.json(),
	limiter,
	// errorHandler
)

routes.push(
	// new UserRoutes(app),
	new AuthRoutes(app),
	new RecipeRoutes(app)
)

app.listen(PORT || 5000, () => {
	console.log(`Server is listening !`)

	routes.forEach((route) => {
		console.log(`Routes configured for ${route.getName()}`)
	})
})

export default app
