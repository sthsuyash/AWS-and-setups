import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Department Resolvers for GraphQL.
 * This module handles queries and mutations related to departments.
 */
const departmentResolvers = {
    /**
     * Fetches all departments along with their associated employees.
     * @returns {Promise<Object[]>} A promise that resolves to an array of departments.
     * @throws {Error} Throws an error if fetching departments fails.
     */
    Query: {
        departments: async () => {
            try {
                return await prisma.department.findMany({
                    include: {
                        employees: true, // Fetch employees related to department
                    },
                });
            } catch (error) {
                console.error("Error fetching departments:", error);
                throw new Error("Failed to fetch departments.");
            }
        },

        /**
         * Fetches a single department by ID, along with its associated employees.
         * @param {Object} _ Unused.
         * @param {Object} args The arguments containing the department ID.
         * @param {number} args.id The ID of the department to fetch.
         * @returns {Promise<Object>} A promise that resolves to the department object.
         * @throws {Error} Throws an error if the department is not found or if fetching fails.
         */
        department: async (_, { id }) => {
            try {
                const department = await prisma.department.findUnique({
                    where: { id: Number(id) },
                    include: { employees: true },
                });
                if (!department) {
                    throw new Error(`Department with ID ${id} not found.`);
                }
                return department;
            } catch (error) {
                console.error("Error fetching department:", error);
                throw new Error("Failed to fetch department.");
            }
        },
    },

    /**
     * Mutations related to departments.
     */
    Mutation: {
        /**
         * Creates a new department.
         * @param {Object} _ Unused.
         * @param {Object} args The arguments containing the department input.
         * @param {Object} args.input The input data for creating a department.
         * @param {string} args.input.name The name of the department to create.
         * @returns {Promise<Object>} A promise that resolves to the created department object.
         * @throws {Error} Throws an error if the department name is missing or if creating fails.
         */
        createDepartment: async (_, { input }) => {
            const { name } = input;

            // Basic validation
            if (!name) {
                throw new Error("Department name is required.");
            }

            try {
                return await prisma.department.create({
                    data: { name },
                });
            } catch (error) {
                console.error("Error creating department:", error);
                throw new Error("Failed to create department.");
            }
        },
    },
};

export default departmentResolvers;
