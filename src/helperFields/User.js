import {GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} from "graphql";
import blogField from "./BlogAndBlogs"
const UserBlogs = new GraphQLObjectType({
    name: "UserBlogs",
    fields: blogField
});
const fields = {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    blogs: {type: new GraphQLList(UserBlogs)},
    email: {type: GraphQLString},
    role: {type: GraphQLString},
    token: {type: GraphQLString},
};

export default fields
