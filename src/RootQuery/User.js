import {GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import jwt from "jsonwebtoken"
import User from "../models/User"
import fields from "../helperFields/User";

const secretKey = "secretKey";


const profile = {
    type: new GraphQLObjectType({
        name: "userProfile",
        fields
    }),
    args: {
        token: {type: GraphQLString}
    },
    resolve: (parentValue, {token}) => {
        const decoded = jwt.verify(token, secretKey);
        return {
            ...decoded
        }
    }
};

export {
    profile
}
