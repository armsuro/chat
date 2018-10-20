import {
    Router,
} from 'express';


// Middlwers
import authenticate from '../middleware/authenticate';
import checkRoleCustomer from '../middleware/checkRoleCustomer';
import checkRoleRepairshop from '../middleware/checkRoleRepairshop';
import checkRequestParamets from '../middleware/checkRequestParamets';
import errorHandler from '../middleware/errorHandler';

// Controllers
import UserController from '../controllers/user.controller';
import QuoteController from '../controllers/quote.controller';

const routes = new Router();

routes.get('/', (req, res) => res.send({ 'api_version': 1 }));

routes.post('/auth/login', (req, res, next) =>
	checkRequestParamets(req, res, next, ['username', 'password']), UserController.login);

routes.post('/auth/logout', authenticate, UserController.logout);

routes.post('/quote', [authenticate, (req, res, next) =>
	checkRequestParamets(req, res, next, ['name']), checkRoleCustomer], QuoteController.create);

routes.put('/quote/assign/:id', [authenticate, (req, res, next) =>
	checkRequestParamets(req, res, next, ['id']), checkRoleRepairshop], QuoteController.assign);

routes.get('/quote/waiting', [authenticate, checkRoleRepairshop], QuoteController.waiting);

routes.put('/quote/:id', [authenticate, (req, res, next) =>
	checkRequestParamets(req, res, next, ['name', 'id']), checkRoleCustomer], QuoteController.update);

routes.delete('/quote/:id', [authenticate, (req, res, next) =>
	checkRequestParamets(req, res, next, ['id']), checkRoleCustomer], QuoteController.destroy);

routes.get('/quote', [authenticate], QuoteController.get);

routes.use(errorHandler);

export default routes;
