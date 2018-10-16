import path from 'path';
import merge from 'lodash/merge';

// Default configuations applied to all environments
const defaultConfig = {
    'env': process.env.NODE_ENV,
    get 'envs'() {
        return {
            'test': process.env.NODE_ENV === 'test',
            'development': process.env.NODE_ENV === 'development',
            'production': process.env.NODE_ENV === 'production',
        };
    },

    'version': require('../../package.json').version,
    'root': path.normalize(__dirname + '/../../..'),
    'port': process.env.PORT || 4567,
    'ip': process.env.IP || '0.0.0.0',
    'apiPrefix': '/api', // Could be /api/resource or /api/v2/resource

    /**
     * Default constants
     */
    'websocket_path': process.env.WEBSOCKET_PATH || '/socket.io',

    /**
     * Security configuation options regarding sessions, authentication and hashing
     */
    'security': {
        'sessionSecret': process.env.SESSION_SECRET || 'i-am-the-secret-key',
        'sessionExpiration': process.env.SESSION_EXPIRATION || '30 minutes',
        'saltRounds': process.env.SALT_ROUNDS || 12,
    },

    /**
     * Acounts types
     */
    'types': {
        'customer': '1',
        'repairshop': '2',
    },
};

// Environment specific overrides
const environmentConfigs = {
    'development': {
        'database': {
            'username': process.env.DB_USERNAME || 'postgres',
            'password': process.env.DB_PASSWORD || '123456',
            'database': process.env.DB_DATABASE || 'chat',
            'host': process.env.DB_HOST || '127.0.0.1',
            'dialect': process.env.DB_CONNECTION || 'postgresql',
        },
    },
    'test': {
        'port': 5678,
        'database': {
            'username': process.env.DB_USERNAME || 'postgres',
            'password': process.env.DB_PASSWORD || '123456',
            'database': process.env.DB_DATABASE || 'chat',
            'host': process.env.DB_HOST || '127.0.0.1',
            'dialect': process.env.DB_CONNECTION || 'postgresql',
        },
    },
    'production': {
        'database': {
            'username': process.env.DB_USERNAME || 'postgres',
            'password': process.env.DB_PASSWORD || '123456',
            'database': process.env.DB_DATABASE || 'chat',
            'host': process.env.DB_HOST || '127.0.0.1',
            'dialect': process.env.DB_CONNECTION || 'postgresql',
        },
    },
};

// Recursively merge configurations
export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
