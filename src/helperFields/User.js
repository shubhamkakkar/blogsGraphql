import {GraphQLID, GraphQLString} from "graphql";

const fields = {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    role: {type: GraphQLString},
    token: {type: GraphQLString},
};

export default fields
