const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
/**
 * Class representing an API error.
 * @extends Error
 */
class APIError extends Error {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
        super(message);
        this.name = APIError.name;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true;
    }
}

module.exports = {
    encryptPassword: async (password) => {
       const salt = await bcrypt.genSalt(10);
       return await bcrypt.hash(password, salt);
    }, 

    matchPassword: async (password, savePassword) => {
        console.log("savePassword", await bcrypt.compare(password, savePassword));
       return await bcrypt.compare(password, savePassword)
    },

    APIError
}

