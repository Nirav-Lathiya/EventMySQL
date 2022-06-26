const pool = require('../config/db')
const jwt = require('jsonwebtoken')
const httpStatus  = require('http-status');
const bcrypt = require('bcryptjs');

const { APIError, encryptPassword, matchPassword} = require('../helper/APIErrors')

const registerUser = async (req, res, next) => {
    try {

        let { firstName, lastName, email, password } = req.body;
        // password = await encryptPassword(password);

        const isUser = await pool.query(`SELECT * FROM evenemanagement.users WHERE email =  ?`, [email]);
        console.log("isUse...", Object.values(JSON.parse(JSON.stringify(isUser))));
        // await pool.query(`DELETE FROM user WHERE email = ?`, [email]);
        if (isUser.length > 0) {
            return next(new APIError('user already registered', httpStatus.BAD_REQUEST, true));
        }

        await pool.query(`INSERT INTO evenemanagement.users  SET ? `,{ firstName, lastName, email, password });
        return res.send({
            status: 200,
            message: 'user registered sucessfully'
        });
    } catch (error) {
        console.log("eee",error);
        return next(
            new APIError(error.message, httpStatus.INTERNAL_SERVER_ERROR, true)
        );
    }
}


const loginUser = async (req, res, next) => {
    try {

        let { email, password } = req.body;
        let isUser = await pool.query(`SELECT * FROM users WHERE email =  ? AND password =  ?`, [email, password]);

        isUser = JSON.parse(JSON.stringify(isUser));
        console.log("isUser",isUser);
        if (isUser.length === 0) {
            return next(new APIError('user not found or password incorrect', httpStatus.BAD_REQUEST, true));
        }
       
        return res.send({
            success: true,
            message: 'login sucessfully'
        })

    } catch (error) {
        console.log("errrr",error);
        return next(
            new APIError(error.message, httpStatus.INTERNAL_SERVER_ERROR, true)
        );
    }
}

module.exports = {
    registerUser,
    loginUser
}