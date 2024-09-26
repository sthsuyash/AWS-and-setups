import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const employeeResolvers = {
    Query: {
        employees: async () => {
            try {
                return await prisma.employee.findMany({
                    include: { department: true },
                });
            } catch (error) {
                throw new Error('Error fetching employees');
            }
        },
        employee: async (_, { id }) => {
            try {
                return await prisma.employee.findUnique({
                    where: { id: Number(id) },
                    include: { department: true },
                });
            } catch (error) {
                throw new Error(`Error fetching employee with id ${id}`);
            }
        },
    },
    Mutation: {
        createEmployee: async (_, { input }) => {
            const { firstName, lastName, email, departmentId = null } = input;
            let intDepartmentId = null;

            if (departmentId) {
                intDepartmentId = Number(departmentId);
            }
            try {
                return await prisma.employee.create({
                    data: { firstName, lastName, email, departmentId: intDepartmentId },
                });
            } catch (error) {
                console.log('Error creating employee', error);
                throw new Error('Error creating employee', error);
            }
        },
        assignDepartment: async (_, { employeeId, departmentId }) => {
            try {
                return await prisma.employee.update({
                    where: { id: Number(employeeId) },
                    data: { departmentId: Number(departmentId) },
                    include: { department: true },
                });
            } catch (error) {
                throw new Error(`Error assigning department to employee with id ${employeeId}`);
            }
        },
    },
};

export default employeeResolvers;