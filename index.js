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


app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

const PORT = 3000;
app.listen(PORT, () => console.log(PORT))