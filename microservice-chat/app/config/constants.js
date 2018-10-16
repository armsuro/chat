import path from 'path';
import merge from 'lodash/merge';

// Default configuations applied to all environments
const defaultConfig = {
    'env': process.env.NODE_ENV,
    get envs() {
        return {
            'test': process.env.NODE_ENV === 'test',
            'development': process.env.NODE_ENV === 'development',
            'production': process.env.NODE_ENV === 'production',
        };
    },

    'version': require('../../package.json').version,
    'root': path.normalize(__dirname + '/../../'),

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

    },
    'test': {},
    'production': {

    },
};

// Recursively merge configurations
export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});