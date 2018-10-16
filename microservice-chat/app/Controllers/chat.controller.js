import BaseController from './base.controller';
import {
    chat,
    users,
    Op
} from 'db';


/**
 * ChatContoller class working with live chat data.
 * extends BaseController
 * @class
 */
class ChatContoller extends BaseController {

    /**
     * joinRoom join client in chat room and send last 10 messages
     * @param { body } Object - User and chat data
     * @function
     */
    async joinRoom({
        body
    }, res) {
        try {
            const quoteData = await chat.Quote.findOne({
                'where': {
                    [Op.or]: [{
                        'customer_id': body.user.id,
                        'id': body.data.quote_id
                    }, {
                        'repairshop_id': body.user.id,
                        'id': body.data.quote_id
                    }]
                },
                'include': [{
                    'model': chat.Message,
                    'as': 'Messages',
                    'limit': 10,
                    'order': [['id', 'desc']],
                }, {
                    'model': users.Account,
                    'as': 'Customer',
                }, {
                    'model': users.Account,
                    'as': 'Repairshop',
                }],
            })

            return res.send({
                'status': 'success',
                'data': quoteData
            })
        } catch (err) {
            console.error(err)
        }
    }
    /**
     * sendMessage create new chat message
     * @param { body } Object - User and chat data
     * @function
     */
    async sendMessage({
        body
    }, res) {
        try{
            const quoteData = await chat.Message.create({
                'text': body.data.text,
                'type': body.user.type,
                'quote_id': body.data.quote_id,
                'from': body.user.id
            })
            res.send({
                'status': 'success',
                'data': quoteData
            })
        }catch(err){
            console.error(err)
        }
    }
}

export default new ChatContoller;