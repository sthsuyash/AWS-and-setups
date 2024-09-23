import { mergeTypeDefs } from '@graphql-tools/merge';

import userTypeDef from './user.typeDef.js';

const mergedTypeDefs = mergeTypeDefs([userTypeDef]);

export default mergedTypeDefs;

/**
 * Why Merge Type Definitions?
 * 
 * - Modularity: Merging type definitions allows you to keep related schema components in separate files,
 * promoting modularity and making it easier to manage your schema.
 * 
 * - Easier Collaboration: If multiple developers are working on the same project, merging type definitions
 * can make it easier to collaborate. Each developer can work on a separate file, and the changes can be merged
 * 
 * - Reusability: Merging type definitions allows you to reuse schema components across multiple projects.
 * 
 * - Clear separation of concerns: Merging type definitions allows you to separate the concerns of your schema
 * Each file can focus on specific domain or type of data, making it easier to understand and maintain.
 */