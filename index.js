import express from 'express'
import mongoose from "mongoose"
import dotenv from "dotenv"
import expressGraphQL from "express-graphql"
import schema from "./src/schema"

dotenv.config()
const MONGO_URI = process.env.MONGO_URI
const app = express();
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(res => console.log("connected to mongoose instance"))
    .catch(er => console.log("failed to connect to mongoose instance"));


const auth = (req, res, next) => {
    // do something with it
    next()
};

app.use('/graphql',  auth, (req, res) => {
    expressGraphQL({
        schema,
        graphiql: true,
    })(req, res)
} );

const PORT = 3000;
app.listen(PORT, () => console.log(PORT));
