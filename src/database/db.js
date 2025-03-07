import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()


const { connect, connection } = mongoose
const URI = process.env.NODE_ENV === 'test' ? process.env.TESTDBURL : process.env.NODE_DEV = 'dev' ? process.env.DEVDBURL : process.DATABASEURL
const uri = "mongodb://temmytope:temmytope@127.0.0.1:27017/dev_movie_ticketing_app?authSource=admin"


const db_connect = async () => {
    try {
        console.log(uri)
        await connect(`${uri}`)
        return

    } catch (error) {
        await connection.close()
        throw error
    }
}

const db_close = async () => {
    if (connection.readyState === 1) {
        await connection.close()
    }
}

export { db_close, db_connect }

