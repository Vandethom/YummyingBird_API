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

const db = process.env.MONGODB_URI
const app = express()
const host = '0.0.0.0' || 'localhost'
const PORT = process.env.PORT || 5000

mongoose.connect("mongodb+srv://Thomas:fondation7@YummyinBird.5uylw8c.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Database connected successfully!');
      })
      .catch((err) => {
        console.log('Error connecting with error code:', err);
      });

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// console.log('directory-name 👉️', __dirname)
const routes = []

// Restrict all routes to only 100 requests per IP address every 10 minutes
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,    // 10 minutes
	max: 100                     // 100 requests per IP
})

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	next();
  })

app.use(
	cors(),
	express.static(__dirname),
	helmet(),
	express.json(),
	limiter,
	// errorHandler
)

routes.push(
	// new UserRoutes(app),
	new AuthRoutes(app),
	new RecipeRoutes(app)
)

app.listen(PORT, () => {
	console.log(`Server is listening !`)

	routes.forEach((route) => {
		console.log(`Routes configured for ${route.getName()}`)
	})
})

export default app
