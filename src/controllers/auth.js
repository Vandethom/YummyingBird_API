import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'


class AuthController {
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Log-in  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/login  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async login(req, res) {
        const { email, password } = req.body,
            user = await User.findOne({ email: email })

        if (!user) {
            res.status(400).json('Bad inputs or user doesn\'t exist.')
        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    res.status(200).json({
                        user: user,
                        token: jwt.sign(
                            { user },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '1h' }
                        )
                    })
                } else {
                    res.status(401).json({ error: 'Mot de passe incorrect.'})
                    res.redirect( '/' )
                }
            }
        )}	
    }
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  Sign up  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-  http://localhost:3000/signup  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
    async signup(req, res) {
        const { email, password, firstName, lastName, role } = req.body
        
        try {
            bcrypt.hash(password, 12, async function(err, hash) {
                try {
                    const user = await User.create({
                            email: email,
                            password: hash,
                            firstName: firstName,
                            lastName: lastName,
                            role: role
                        })
            
                    res.status(201).json(user)
                } catch (error) {
                    res.status(500).json({ error: error.message})
                }
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default new AuthController()
