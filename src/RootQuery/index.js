import {GraphQLObjectType} from "graphql"

import {blogs, blog} from "./BlogAndBlogs"
import { profile } from "./User";

const Blogs = {
    blogs,
    blog
};

const Users = {
    profile
};

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        ...Blogs,
        ...Users
    })
});

export default RootQuery
