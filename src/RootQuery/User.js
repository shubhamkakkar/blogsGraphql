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
        const {_id} = jwt.verify(token, secretKey);
        return User.findById(_id)
            .then(res => {
                console.log({ res })
                return res
            })
            .catch(er => console.log({er}))
    }
};

export {
    profile
};
