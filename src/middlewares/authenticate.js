import { get } from "mongoose"
import { verifyToken, isTokenBlacklisted } from "../utils/token.js"
import { UserType } from "../schema/user.js"
import { hash_password } from "../utils/password.js"


export const authenticate = async (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth) {
        return res.status(401).send("Unauthenticated user, bearer token required")
    }
    else {
        try {
            const token = auth.split(" ")[1]
            const is_token_blacklisted = await isTokenBlacklisted(token)
            if (is_token_blacklisted) return res.status(400).send("Token not valid")
            const decode = await verifyToken(token)
            if (decode._id) {
                req.decode = decode
                next()
            }
            else {
                return res.status(401).send("Unauthenticated User")
            }
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
}

export const unrestricted = async (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth) {
        next()
    }
    else {
        try {
            const token = auth.split(" ")[1]
            const is_token_blacklisted = await isTokenBlacklisted(token)
            if (is_token_blacklisted) return res.status(400).send("Token not valid")
            const decode = await verifyToken(token)
            if (decode) {
                req.decode = decode
                next()
            }
            else {
                next()
            }
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
}



export const isAdmin = async (req, res, next) => {

    if (req.decode.userType === UserType.ADMIN) {
        next()
    }
    else {
        return res.status(403).send("Unauthorized User")
    }
}

export const isOwner = async (req, res, next) => {

    if (req.decode.userType === UserType.OWNER) {
        next()
    }
    else {
        return res.status(403).send("Unauthorized User")
    }
}

export const isViewer = async (req, res, next) => {

    if (req.decode.userType === UserType.VIEWER) {
        next()
    }
    else {
        return res.status(403).send("Unauthorized User")
    }
}



export const isAdminOrOwner = async (req, res, next) => {
    // console.log(req.decode)
    if (req.decode.userType == "owner" || req.decode.userType == "admin") {
        next()
    }
    else {
        return res.status(403).send("Unauthorized User")
    }
}

export const hashPassword = async (req, res, next) => {
    const { password } = req.body
    try {
        if (password) {
            req.body.password = await hash_password(password)
            next()
        }
        else {
            res.status(403).send("Password required")
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const user_update_permission = async (req, res, next) => {
    req.decode.userType === "admin" || req.decode._id === req.params.id ? next() : res.status(403).send("Unauthorised user")
}
