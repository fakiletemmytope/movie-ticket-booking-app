import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()


const { connect, connection } = mongoose
const URI = process.env.NODE_ENV === 'test' ? process.env.TESTDBURL : process.env.NODE_DEV = 'dev' ? process.env.DEVURL : process.DATABASEURL;


const db_connect = async () => {
    try {
        await connect(`${URI}`)
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

