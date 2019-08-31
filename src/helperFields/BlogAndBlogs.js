import {
    GraphQLID, GraphQLObjectType, GraphQLString
} from "graphql"

const fieldsBlogAndBlogs = {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    createdBy: { type:  GraphQLString},
    content: { type: GraphQLString }
};

export default fieldsBlogAndBlogs
