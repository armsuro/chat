import BaseController from './base.controller';
import Broker from 'broker';

/**
 * QuoteController class
 * @class
 */
class QuoteController extends BaseController {

	/**
     * Constructor function
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * create function send data to chat microservice and create new quote.
     * @param {Object} req - Request body.
     * @param {Object} res - Response.
     */
    create = async (req, res) => {
        const data = await Broker.get('chat:createQuote', {
            'user': req.user,
            'data': req.body,
        });
        return this.handleResponse(data.body, res);
    }

    /**
     * update function send data to chat microservice and update quote.
     * @param {Object} req - Request body.
     * @param {Object} res - Response.
     */
    update = async (req, res) => {
        req.body.id = req.params.id;
        const data = await Broker.get('chat:updateQuote', {
            'user': req.user,
            'data': req.body,
        });
        return this.handleResponse(data.body, res);
    }

    /**
     * destroy function send data to chat microservice and delete quote.
     * @param {Object} req - Request body.
     * @param {Object} res - Response.
     */
    destroy = async (req, res) => {
        req.body.id = req.params.id;
        const data = await Broker.get('chat:destroyQuote', {
            'user': req.user,
            'data': req.body,
        });
        return this.handleResponse(data.body, res);
    }

    /**
     * get create request to chat microservice and get all qoutes.
     * @param {Object} req - Request body.
     * @param {Object} res - Response.
     */
    get = async (req, res) => {
        console.log(11111111111111, req, 2222222222 );
        
        const data = await Broker.get('chat:getAllQuote', {
            'user': req.user,
            'data': req.body,
        });
        return this.handleResponse(data.body, res);
    }

    /**
     * assign funtion assign repairshop to quote.
     * @param {Object} req - Request body.
     * @param {Object} res - Response.
     */
    assign = async (req, res) => {
        const data = await Broker.get('chat:assignQuote', {
            'user': req.user,
            'data': req.params,
        });
        return this.handleResponse(data.body, res);
    }

    /**
     * waiting funtion get all quotes when dont have repairshop.
     * @param {Object} req - Request body.
     * @param {Object} res - Response.
     */
    waiting = async (req, res) => {
        const data = await Broker.get('chat:waitingQuotes', {
            'user': req.user,
            'data': req.body,
        });
        return this.handleResponse(data.body, res);
    }
}

export default new QuoteController();
