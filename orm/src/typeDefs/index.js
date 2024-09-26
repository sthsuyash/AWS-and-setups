import { mergeTypeDefs } from '@graphql-tools/merge';

import employeeTypeDef from './employee.typeDef.js';
import departmentTypeDef from './department.typeDef.js';


const mergedTypeDefs = mergeTypeDefs([employeeTypeDef, departmentTypeDef]);

export default mergedTypeDefs;
