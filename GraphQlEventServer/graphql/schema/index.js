const { buildSchema } = require('graphql')

module.exports = buildSchema(`




        type User {
            _id:ID!
            name:String!
            email:String!
            password:String,
            createdEvents:[Event!]
          
        }

        input UserInput {
            name:String!
            email:String!
            password:String
          
        }

       type Event {
           _id:ID!
           title:String!
           description:String!
           price:Float!
           date:String!
           creator:User!

       } 

       input EventInput {
          title:String!
          description:String!
          price:Float!
          date:String!

       }
      
       type Booking {
        _id:ID!
       user:User!
       event:Event!
       createdAt:String!
       updatedAt:String!
    }
    type AuthData {
      userId:ID!
      token:String!
      tokenExpiration:Int!
    }
  
    type RootQuery {
        events:[Event!]!
        users:[User!]!
        bookings:[Booking!]!
        login(email:String,password:String):AuthData!

    }

    type RootMutation {
        createEvent(eventInput: EventInput):Event!
        createUser(userInput: UserInput):User
        createBooking(eventId:String!,userId:String!):Booking
        calcelBooking(bookingId:String!):String!
        

    }

    schema {
        query:RootQuery
        mutation:RootMutation
    }
    `)
