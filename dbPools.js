import { poolJSS, poolUsers, poolPreprimary, poolSecondary, poolPrimarySchool } from './db.js';

export const getPoolBySchema = (schema) => {
    switch (schema) {
        case 'elimufi1_jss':
          return poolJSS;
        case 'elimufi1_users':
          return poolUsers;
        case 'elimufi1_preprimary':
          return poolPreprimary;
        case 'elimufi1_secondary':
          return poolSecondary;
        case 'elimufi1_primaryschool':
          return poolPrimarySchool;
        default:
          throw new Error('Unknown schema');
      }
};
