import DB from 'db';
import BaseController from './base.controller';
import ResponseService from '../services/response.service';
import TokenService from '../services/token.service';

/**
 * UserController class
 * @class
 * @return {json} methods
 */

class UserController extends BaseController {

    /**
     * Constructor function
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Get function check user exist and generate token.
     * @param {Object} {body} - Request body.
     * @param {Object} res - Response.
     * @return {Object} res - Response.
     */
    login = async({
        body,
    }, res) => {
        try {
            const user = await DB.users.Account.findOne({
                where: {
                    username: body.username,
                },
            });
            if (!user || !await user.validPassword(body.password)) {
                res.status(401);
                return res.json(ResponseService.generate('unauthorized'));
            }
            const token = await TokenService.generate(user);

            const userData = {
                'status': 'success',
                'data': Object.assign(user.toJSON(), {
                    token,
                })
            }
            return this.handleResponse(userData, res);
        } catch (err) {
            console.error(err)
            return this.handleResponse({
                'status': 'server_error',
                'data': err,
            }, res)
        }
    }

    /**
     * Logout function.
     * @param {Object} {body} - Request body.
     * @param {Object} res - Response.
     * @return {Object} res - Response.
     */
    logout = async(req, res) => {
        try {
            const a = await TokenService.destroy(req.user.rjwt);
            return this.handleResponse({
                'status': 'no_data',
            }, res);
        } catch (err) {
            console.error(err)
            return this.handleResponse({
                'status': 'server_error',
                'data': err,
            }, res);
        }
    }

}

export default new UserController();
