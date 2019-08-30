import {
    GraphQLID, GraphQLString
}  from "graphql"
const fieldsBlogAndBlogs = {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    createdBy: { type: GraphQLID },
    content: { type: GraphQLString }
}

export default fieldsBlogAndBlogs