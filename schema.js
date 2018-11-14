const axios = require('axios');


const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Lanuch",
  feilds: () => ({
    flight_number: { type: GraphQLInt },
    flight_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

//Rocket Type

const RocketType  = new GraphQLObjectType({
    name: "Rocket",
    feilds: () => ({
     rocket_id: {type: GraphQLString},
     rocket_name: {type: GraphQLString},
     rocket_type: {type: GraphQLString},
     
    })
  });


  //Root Query
  const RootQuery = new GraphQLObjectType ({
      name: 'RootQueryType',
      feilds: {
          launches: {
type : new GraphQLList(LaunchType),
resolve(parent, args) {
    return axios.get('https://api.spacexdata.com/v3/launches')
    .then(res => res.data);

}

          }
      }
  });


  
  module.exports = new GraphQLSchema({
query: RootQuery
  });

