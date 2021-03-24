const Event = require('../../models/events')
const User = require('../../models/users')
const Booking = require('../../models/booking')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const { getEvent, events, user } = require('./resolverHelper')

module.exports = {

    bookings: async (args, req) => {
        if (!req.isAuth) { throw new Error('Unauthenticated.') }
        try {
            let bookingsData = await Booking.find()
            console.log('bookingsData', bookingsData)
            return bookingsData.map(booking => {
                console.log('booking', booking)
                return {
                    ...booking._doc,
                    _id: booking.id,
                    updatedAt: new Date(booking.updatedAt).toISOString(),
                    createdAt: new Date(booking.createdAt).toISOString(),
                    user: user.bind(this, booking._doc.user),
                    event: getEvent.bind(this, booking._doc.event)
                }
            })
        } catch (error) {
            throw error
        }
    },
    createBooking: async ({ eventId, userId },req) => {
        if (!req.isAuth) { throw new Error('Unauthenticated.') }

        console.log('userId', userId)
        console.log('eventId', eventId)

        try {
            const booking = new Booking({
                event: eventId,
                user: userId
            })
            let savedBooking = await booking.save()
            console.log('savedBooking', savedBooking)
            return {
                ...savedBooking._doc,
                _id: savedBooking.id,
                user: user.bind(this, booking._doc.user),
                event: getEvent.bind(this, booking._doc.event),
                updatedAt: new Date(savedBooking.updatedAt).toISOString(),
                createdAt: new Date(savedBooking.createdAt).toISOString()
            }
        } catch (error) {
            throw error
        }
    },
    calcelBooking: async ({ bookingId },req) => {
        if (!req.isAuth) { throw new Error('Unauthenticated.') }

        try {
            await Booking.remove({ _id: bookingId })
            return '1';
        } catch (error) {
            throw error;
        }
    }
}
