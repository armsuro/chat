import TokenService from '../services/token.service';
import ResponseService from '../services/response.service';

export default async function authenticate(req, res, next) {
    try {
        const {
            authorization,
        } = req.headers;

        const token = await TokenService.verify(authorization);

        if (!authorization || !token) {
            res.status(401);
            return res.json(ResponseService.generate('unauthorized'));
        }
        req.user = token.dataToken;
        req.user.rjwt = token.rjwt;
        next();
    }catch(e) {
        res.status(401);
        return res.json(ResponseService.generate('unauthorized'));
    }
}
