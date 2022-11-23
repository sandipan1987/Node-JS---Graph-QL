const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {GraphQLObjectType ,GraphQLInt, GraphQLString,GraphQLBoolean, GraphQLList,GraphQLSchema } =require('graphql');

const Tasks = require('./db.json');

//Schema 
const taskType = new GraphQLObjectType({
    name: "Tasks",
    description:"my daily tasks list",
    fields: {
        id:{
            type:GraphQLInt
        },
        text:{
            type:GraphQLString
        },
        day:{
            type:GraphQLString
        },
        reminder:{
            type:GraphQLBoolean
        }
    }
});

//resolver
 const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description:"This is the root query",
    fields: {
        task: {
            type: taskType,
            args:{
               id: {type: GraphQLInt}
            },
            resolve(parentValue, args){ // move the resolve function to here
                return _.find(Tasks, {id: args.id});
            }
        }
    }
});


const schema = new GraphQLSchema({query:rootQuery});

const app = express();

app.use('/graphql', graphqlHTTP({
     schema,
     graphiql: true
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

