const {ApolloServer} =  require("apollo-server");
const {typeDefs} = require("./schema/type-defs");
const {resolvers} = require("./schema/resolvers");

const server = new ApolloServer({typeDefs, resolvers});

server.listen(4000).then(() => {
    console.log("server is running")
})