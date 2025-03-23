import { userModel } from "../schema/user.js"
import { db_close, db_connect } from "../database/db.js"
import { sendmail } from "../utils/sendmail.js"
import { getToken } from "../utils/token.js"
import { configDotenv } from "dotenv"


configDotenv()

const URL = process.env.BASE_URL

const getUsers = async (req, res) => {
    try {
        await db_connect()
        const users = await userModel.find({}, "_id email userType status createdAt updatedAt firstName lastName").exec()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

const getUser = async (req, res) => {
    const id = req.decode._id
    try {
        await db_connect()
        const user = await userModel.findById(id, "_id firstName lastName email userType status createdAt updatedAt")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

const createUser = async (req, res) => {
    const { firstName, lastName, email, password, address, userType } = req.body
    try {
        await db_connect()
        const saved_user = await userModel.create({ firstName, lastName, email, password, address, userType })
        const { _id, createdAt, updatedAt } = saved_user;
        const payload = { id: _id, email: email }
        const token = getToken(payload, "20m")
        const msg = `Dear ${firstName},\n\n\nYour account has being created successfully. Click on the link below to activate you account\n\n${URL}/auth/activate?token=${token}\n\nWith love from,\nMINI LEARNING`
        //send email
        await sendmail(email, "Token for activation", msg)
        res.status(200).json({
            firstName, lastName, _id, email, createdAt, updatedAt,
            message: "activation link as been sent to your email"
        })
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

const updateUser = async (req, res) => {
    const { address } = req.body
    const id = req.decode._id
    const update = {}
    if (!address)
        return res.status(400).send("Invalid request")
    update.address = address
    try {
        await db_connect()
        const updated_user = await userModel.findByIdAndUpdate(id, update, { new: true, select: "_id firstName lastName address email userType status createdAt updatedAt" })
        res.status(200).json(updated_user)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }

}

const deleteUser = async (req, res) => {
    const id = req.decode._id
    try {
        await db_connect()
        const deleted_user = await userModel.findByIdAndDelete(id)
        deleted_user ? res.status(204).send() : res.status(404).send('user not found')
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

export {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}