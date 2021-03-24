const Event = require('../../models/events')
const User = require('../../models/users')
const Booking = require('../../models/booking')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const { getEvent, events, user } = require('./resolverHelper')

module.exports = {

    users: async (args, req) => {
        if (!req.isAuth) { throw new Error('Unauthenticated.') }
        try {
            let users = await User.find()
            return users.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    createdEvents: events.bind(this, user.createdEvents)
                }
            })
        }
        catch (error) {
            throw error;
        }
    },

    createUser: async ({ userInput }) => {
        try {
            let pass = await bcrypt.hash(userInput.password, 16)
            const user = new User({
                name: userInput.name,
                password: pass,
                email: userInput.email,
            })
            let savedUser = await user.save()
            return { ...savedUser._doc, _id: savedUser.id, createdEvents: events.bind(this, savedUser.createdEvents) }
        } catch (error) {
            throw error
        }
    },

}
