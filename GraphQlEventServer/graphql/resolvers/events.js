const Event = require('../../models/events')
const User = require('../../models/users')
const Booking = require('../../models/booking')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const { getEvent, events, user } = require('./resolverHelper')

module.exports = {
    events: async () => {
        try {
            let events = await Event.find()
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    creator: user.bind(this, event._doc.creator)
                }
            })
        } catch (error) {
            console.log('error', error)
            throw error
        }
    },

    createEvent: async ({ eventInput },req) => {
        if (!req.isAuth) { throw new Error('Unauthenticated.') }

        try {
            const event = new Event({
                title: eventInput.title,
                description: eventInput.description,
                price: +eventInput.price,
                date: new Date(eventInput.date),
                creator: '602e14d8fc28879dc32b3fde'
            })

            let createdEvent = await event.save()
            let savedUser = await User.findById('602e14d8fc28879dc32b3fde')
            savedUser.createdEvents.push(event);
            await savedUser.save()
            return { ...createdEvent._doc, _id: createdEvent.id, creator: user.bind(this, event.creator) };
        } catch (error) {
            throw error
        }

    }

}
