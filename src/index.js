const { GraphQLServer } = require('graphql-yoga');
const { GraphQLDateTime } = require('graphql-iso-date')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation');

const resolvers = {
GraphQLDateTime,
Query,
Mutation,
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    }
})
const options = {
    port: 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
}
server.start(options,({ port }) =>
    console.log(
        `Server started, listening on port ${port} for incoming requests. `,
    ),
    )