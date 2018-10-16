// Used as entry for development server only
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config();
require('babel-register');
require('./app');
