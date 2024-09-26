import { mergeResolvers } from '@graphql-tools/merge';

import employeeResolvers from './employee.resolver.js';
import departmentResolvers from './department.resolver.js';

const mergedResolvers = mergeResolvers([employeeResolvers, departmentResolvers]);

export default mergedResolvers;
