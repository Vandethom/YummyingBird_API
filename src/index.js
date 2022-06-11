import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


// import errorHandler from './middlewares/error-handler'
// import { UserRoutes } from './routes/user.routes'
// import { AuthRoutes } from './routes/auth.routes'
import { RecipeRoutes } from './routes/recipe.js'

import { reeturn } from './module.js'

dotenv.config()

const db = process.env.DB_CONNECT_STRING
const app = express()
const port = process.env.PORT

mongoose.connect(db)
	.then(() => console.log('Connected to YummyingBird on MongoDB.'))
	.catch(() => console.log('Failed to connect to MongoDB.'))

const routes = []

// Restrict all routes to only 100 requests per IP address every 10 minutes
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,    // 10 minutes
	max: 100                     // 100 requests per IP
})

app.use(
	helmet(),
	cors(),
	express.json(),
	limiter,
	// errorHandler
)

routes.push(
	// new UserRoutes(app),
	// new AuthRoutes(app),
	new RecipeRoutes(app)
)

app.listen(port, () => {
	console.log(`Server is listening on port ${port} !`)

	routes.forEach((route) => {
		console.log(`Routes configured for ${route.getName()}`)
	})
})

export default app
