/**
 * ResponseService class to send many types responses.
 * @class
 */

class ResponseService {
  /**
   * Constructor define all status codes
   * @constructor
   */
  constructor() {
    this.messages = {
      'success': {
        'status': 'Success.',
        'message': 'Successfully processed.',
        'header_status': 200,
      },
      'created': {
        'status': 'Created.',
        'message': 'Successfully processed.',
        'header_status': 201,
      },
      'no_data': {
        'status': 'No Content.',
        'message': 'No Data Matching For Your Request.',
        'header_status': 203,
      },
      'bad_request': {
        'status': 'Bad Request.',
        'message': 'Bad Request.',
        'header_status': 400,
      },
      'unauthorized': {
        'status': 'Unauthorized.',
        'message': 'Unauthorized.',
        'header_status': 401,
      },
      'forbidden': {
        'status': 'Forbidden.',
        'message': 'Forbidden.',
        'header_status': 403,
      },
      'not_found': {
        'status': 'Not Found.',
        'message': 'Not Found.',
        'header_status': 404,
      },
      'not_allowed': {
        'status': 'Method Not Allowed.',
        'message': 'Method Not Allowed.',
        'header_status': 405,
      },
      'unprocessable': {
        'status': 'Unprocessable Entity.',
        'message': 'Unprocessable Entity.',
        'header_status': 422,
      },
      'login_timeout': {
        'status': 'Login Timeout.',
        'message': 'Login Timeout.',
        'header_status': 401,
      },
      'unavailable': {
        'status': 'Unavailable For Legal Reasons.',
        'message': 'Check Your Access To This Action.',
        'header_status': 451,
      },
      'server_error': {
        'status': 'Internal Server Error.',
        'message': 'Please try later.',
        'header_status': 500,
      },
      'bad_gateway': {
        'status': 'Bad Gateway.',
        'message': 'Bad Gateway.',
        'header_status': 502,
      },
    };
  }

  /**
   * getStatus function one status data
   * @param {String} status - Handle status.
   * @return {Object} data.
   */
  getStatus(status) {
    return this.messages[status];
  }

  /**
   * Generate function creates and returns json for responses
   * @param {String} key - The key of status code.
   * @param {Object} data - The data is an additional field. If you give argument to the function, it returns your data, otherwise {}.
   * @param {String} message - The message is an additional field. If you give argument to the function, it returns your message, otherwise send custom message.
   * @return {Object} created response.
   */
  generate(key, data = {}, message) {
    const obj = this.messages[key];
    return {
      data,
      status: obj['status'],
      http_status: obj['header_status'],
      message: message ? message : obj['message'],
    };
  }
}

export default new ResponseService();
