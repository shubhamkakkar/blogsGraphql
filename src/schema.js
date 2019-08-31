import {
    GraphQLSchema,
} from "graphql";

import RootQuery from "./RootQuery"
import mutation from "./Mutation"

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation
});


export default schema;
