import Constants from '../config/constants';
import RedisJwt from 'redis-jwt';

/**
 * TokenService class working wit tokens.
 * @class
 */

class TokenService {
    /**
     * Constructor define RedisJWT
     * @constructor
     */
    constructor() {
        this.JWT = new RedisJwt({
            host: process.env.REDIS_HOST || '127.0.0.1', // can be IP or hostname
            port: process.env.REDIS_PORT || 6379, // port
            maxretries: 10, // reconnect retries, default 10
            secret: Constants.security.sessionSecret, // secret key for Tokens!
        });
    }

    /**
     * generate function create new JWT token
     * @param {Object} user - user data.
     * @return {Object} data.
     */
    generate(user) {
        return this.JWT.sign(Constants.security.sessionSecret, {
          ttl: Constants.security.sessionExpiration,
          dataToken: user,
        });
    }
    /**
     * verfy function check JWT token
     * @param {string} token - JWT token.
     * @return {json} created response.
     */
    async verify(token) {
        return this.JWT.verify(token);
    }
    /**
     * destroy function using for logout
     * @param {string} token - JWT token.
     * @return {json} created response.
     */
    async destroy(token) {
        const call = this.JWT.call();
        return call.destroy(token);
    }
}

export default new TokenService();
