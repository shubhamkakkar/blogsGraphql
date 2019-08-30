import {
    GraphQLObjectType
} from "graphql";

import { addBlog, editBlog, deleteBlog } from "./BlogAndBlogs"


const blogMutations = {
    addBlog,
    editBlog,
    deleteBlog
}

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...blogMutations
    }
})

export default mutation