const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type Recipe {
        id: ID! @id
        title: String
        directions: [String]
        ingredients: [String]
    }
`;

const driver = neo4j.driver(
    "neo4j://it2810-30.idi.ntnu.no:7687",
    neo4j.auth.basic("neo4j", "admin")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });

    server.listen(8080).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})
