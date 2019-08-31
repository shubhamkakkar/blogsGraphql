import {
    GraphQLObjectType
} from "graphql";

import {addBlog, editBlog, deleteBlog} from "./BlogAndBlogs"
import {signin, login, allUserAdmin} from "./User"

const blogMutations = {
    addBlog,
    editBlog,
    deleteBlog
};

const userMutations = {
    signin,
    login,
    allUserAdmin
};

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...blogMutations,
        ...userMutations
    }
});


export default mutation
