import ResponseService from '../services/response.service';

export default function checkRequestParamets(req, res, next, params) {
   	for(let i in params) {
   		if(!req.body[params[i]] && !req.params[params[i]]) {
   			res.status(400);
    		return res.json(ResponseService.generate('bad_request', req.body, `${params[i]} is required`));
   		}else{
   			continue;
   		}
   	}
   	next();
}
