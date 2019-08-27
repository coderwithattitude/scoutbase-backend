const { GraphQLServer } = require('graphql-yoga');

const resolvers = {

}

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
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