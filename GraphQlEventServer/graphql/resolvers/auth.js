const Event = require('../../models/events')
const User = require('../../models/users')
const Booking = require('../../models/booking')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const { getEvent, events, user } = require('./resolverHelper')
const jwt = require('jsonwebtoken')

module.exports = {

    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email: email })
            if (!user) { throw new Error('User does not exist!') }
            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) { throw new Error('Password is incorrect!') }
            const token = jwt.sign({
                userId: user.id,
                email: user.email
            }, 'secretKey', {
                expiresIn: '1h'
            })
            return {
                token,
                userId: user.id,
                tokenExpiration: 1
            }
        } catch (error) {
            throw error
        }
    }
}
