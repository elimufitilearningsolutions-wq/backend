import { poolJSS, poolUsers, poolPreprimary, poolSecondary, poolPrimarySchool, poolSeniorSchool, poolCollege } from './db.js';

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
        case `elimufi1_senior`:
          return poolSeniorSchool;
          case `elimufi1_college`:
            return poolCollege
        default:
          throw new Error('Unknown schema');
      }
};
