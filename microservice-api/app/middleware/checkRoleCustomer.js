import ResponseService from '../services/response.service';
import Constants from '../config/constants';

export default function checkRoleCustomer(req, res, next) {
    if(req.user.type == Constants.types.customer) {
		return next();
    }

	res.status(451);
    return res.json(ResponseService.generate('unavailable'));
}
