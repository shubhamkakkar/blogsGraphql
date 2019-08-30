import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import BlogsModel from "../models/Blogs"
import fields from "../helperFields/BlogAndBlogs"


const blog = {
    type: new GraphQLObjectType({
        name: "blog",
        fields
    }),
    args: { id: { type: GraphQLID }  },
    resolve: (parentValue, { id }) => {
        console.log({ parentValue, id })
        return BlogsModel.findById( id )
    }
}

const blogObject = new GraphQLObjectType({
    name: "blogs",
    fields
})


const blogs = {
    type: new GraphQLList(blogObject),
    args: {},
    resolve: (parentValue, args) => {
        console.log({ parentValue, args })
        return BlogsModel.find()
    }
}
export { blog, blogs }