import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
	email: { 
        type: String,
        nullable: false,
        unique: true 
    },
    password: {
        type: String,
        nullable: false
    },
    firstName: {
        type: String,
        nullable: false
    },
    lastName: {
        type: String,
        nullable: false
    },
    role: {
        type: String,
        default: 'user'
    },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

export {User}
