//Import modules hire
import {
    chat,
    users
} from 'db';
import BaseController from './base.controller';
import Constants from '../config/constants';

/**
 * QuoteController class working with quote data.
 * extends BaseController
 * @class
 */
class QuoteController extends BaseController {
    /**
     * create function create new quote.
     * @param {Object} {body} - quote data.
     * @param {Object} res  - Response.
     * @function
     */
    async create({
        body
    }, res) {
        try {
            const newQuote = await chat.Quote.create({
                'name': body.data.name,
                'customer_id': body.user.id
            });
            return res.send({
                'status': 'success',
                'data': newQuote
            })
        } catch (err) {
            console.error(err)
            res.send(err);
        }
    }
    /**
     * update function update quote.
     * @param {body} Object - quote data.
     * @param res Object - Response.
     * @function
     */
    async update({
        body
    }, res) {
        try {
            const quoteData = await chat.Quote.findOne({
                'where': {
                    'id': body.data.id,
                }
            });
            if (quoteData.customer_id == body.user.id) {
                quoteData.name = body.data.name;
                await quoteData.save();
                return res.send({
                    'status': 'success',
                    'data': quoteData,
                })
            } else {
                return res.send({
                    'status': 'unavailable'
                })
            }
        } catch (err) {
            console.error(err)
            res.send(err);
        }
    }
    /**
     * destroy function delete quote.
     * @param {body} Object - quote data.
     * @param res Object - Response.
     * @function
     */
    async destroy({
        body
    }, res) {
        try {
            const quoteData = await chat.Quote.findOne({
                'where': {
                    'id': body.data.id
                }
            });
            if (quoteData.customer_id == body.user.id) {
                quoteData.name = body.data.name;
                await quoteData.destroy();
                return res.send({
                    'status': 'success',
                    'data': quoteData
                })
            } else {
                return res.send({
                    'status': 'unavailable'
                })
            }
        } catch (err) {
            console.error(err)
            res.send(err);
        }
    }
    /**
     * getAll function get all quotes.
     * @param {body} Object - quote data.
     * @param res Object - Response.
     * @function
     */
    async getAll({
        body
    }, res) {
        try {
            const where = body.user.type == Constants.types.customer ? {
                'customer_id': body.user.id
            } : {
                'repairshop_id': body.user.id
            };
            const quoteData = await chat.Quote.findAll({
                where,
                'include': [{
                    'model': users.Account,
                    'as': 'Customer',
                }, {
                    'model': users.Account,
                    'as': 'Repairshop',
                }],
            });
            return res.send({
                'status': 'success',
                'data': quoteData
            })
        } catch (err) {
            console.error(err)
            res.send(err);
        }
    }

    /**
     * assign function assign repairshop to quote.
     * @param {body} Object - quote data.
     * @param res Object - Response.
     * @function
     */
    async assign({
        body
    }, res) {
        try {
            await chat.Quote.update({
                repairshop_id: body.user.id
            }, {
                'where': {
                    'id': body.data.id
                }
            });
            return res.send({
                'status': 'success',
                'data': []
            })
        } catch (err) {
            console.error(err)
            res.send(err);
        }
    }

    /**
     * waiting function return all waiting quotes.
     * @param {body} Object - quote data.
     * @param res Object - Response.
     * @function
     */
    async waiting({
        body
    }, res) {
        try {
            const quoteData = await chat.Quote.findAll({
                'where': {
                    'repairshop_id': null
                }
            });
            return res.send({
                'status': 'success',
                'data': quoteData
            })
        } catch (err) {
            console.error(err)
            res.send(err);
        }
    }
}

export default new QuoteController;