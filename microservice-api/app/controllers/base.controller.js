import ResponseService from '../services/response.service';

/**
 * BaseController class
 * @class
 */
class BaseController {
    /**
     * handleResponse chech response.
     * @param {Object} data - data.
     * @param {Object} res - Response.
     */
    handleResponse(data, res) {
        const statusData = ResponseService.getStatus(data.status);
        const status = statusData ? data.status : 'server_error';
        const statusCode = status != 'server_error' ? statusData['header_status'] : 500;
        res.status(statusCode);
        delete data.status;
        res.json(ResponseService.generate(status, data.data));
    }
}

export default BaseController;
