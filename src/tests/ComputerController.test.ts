import request from 'supertest';
import express from 'express';
import computerRoutes from '../routes/computers';

const app = express();
app.use(express.json());
app.use('/computers', computerRoutes);

describe('ComputerController', () => {
    it('GET /computers should return 200', async () => {
        const res = await request(app).get('/computers/available');
        expect(res.status).toBe(200);
    });

    it('GET /computers/available should return 500 if an error occurs', async () => {
        jest.spyOn(require('../models').Computer, 'findAll').mockRejectedValue(new Error('DB error'));
        const res = await request(app).get('/computers/available');
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Error fetching available computers');
        expect(res.body).toHaveProperty('error');
    });

    it('POST /computers/assign should return 500 if an error occurs while assigning', async () => {
        jest.spyOn(require('../models').Computer, 'findByPk').mockRejectedValue(new Error('DB error'));
        const res = await request(app)
            .post('/computers/assign')
            .send({computer_id: 1, user_id: 2, assignment_date: new Date()});
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Error assigning computer');
        expect(res.body).toHaveProperty('error');
    });

    it('GET /computers/assignments should return 500 if an error occurs', async () => {
        jest.spyOn(require('../models').ComputerAssignment, 'findAll').mockRejectedValue(new Error('DB error'));
        const res = await request(app).get('/computers/assignments');
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Error fetching assignments');
        expect(res.body).toHaveProperty('error');
    });

    it('POST /computers/assign should return 404 if computer or user is not found', async () => {
        jest.spyOn(require('../models').Computer, 'findByPk').mockResolvedValue(null);
        jest.spyOn(require('../models').User, 'findByPk').mockResolvedValue(null);

        const res = await request(app)
            .post('/computers/assign')
            .send({computer_id: 999, user_id: 999, assignment_date: new Date()});

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Computer or User not found');
    });

    it('POST /computers/assign should assign an available computer and return 201', async () => {
        const computerMock = {
            id: 1,
            brand: 'Dell',
            model: 'XPS',
            serial_number: '123ABC',
            status: 'available',
            update: jest.fn().mockResolvedValue(true),
        };
        const userMock = {
            id: 2,
            name: 'Juan Pérez',
        };
        const assignmentMock = {
            id: 1,
            computer_id: 1,
            computer_name: 'Dell XPS',
            serial_number: '123ABC',
            user_id: 2,
            user_name: 'Juan Pérez',
            assignment_date: new Date(),
            status: 'active',
        };

        jest.spyOn(require('../models').Computer, 'findByPk').mockImplementation((...args: unknown[]) => {
            const id = args[0] as number;
            if (id === 1) return Promise.resolve(computerMock);
            return Promise.resolve(null);
        });
        jest.spyOn(require('../models').User, 'findByPk').mockResolvedValue(userMock);
        jest.spyOn(require('../models').ComputerAssignment, 'create').mockResolvedValue(assignmentMock);

        const res = await request(app)
            .post('/computers/assign')
            .send({computer_id: 1, user_id: 2, assignment_date: new Date()});

        expect(res.status).toBe(201);
        expect(res.body.computer_id).toBe(1);
        expect(res.body.user_id).toBe(2);
        expect(res.body.status).toBe('active');
    });

    it('POST /computers/assign should return 400 if the computer is not available', async () => {
        const computerMock = {
            id: 1,
            brand: 'Dell',
            model: 'XPS',
            serial_number: '123ABC',
            status: 'assigned',
            update: jest.fn(),
        };
        const userMock = { id: 2, name: 'Juan Pérez' };

        jest.spyOn(require('../models').Computer, 'findByPk').mockResolvedValue(computerMock);
        jest.spyOn(require('../models').User, 'findByPk').mockResolvedValue(userMock);

        const res = await request(app)
            .post('/computers/assign')
            .send({computer_id: 1, user_id: 2, assignment_date: new Date()});

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Computer is not available');
    });

    it('should return the assignment history ordered by date', async () => {
        const assignmentsMock = [
            {
                id: 1,
                computer_id: 1,
                computer_name: 'Dell XPS',
                serial_number: '123ABC',
                user_id: 2,
                user_name: 'Juan Pérez',
                assignment_date: new Date('2024-06-01').toISOString(),
                status: 'active',
            },
            {
                id: 2,
                computer_id: 2,
                computer_name: 'HP EliteBook',
                serial_number: '456DEF',
                user_id: 3,
                user_name: 'Ana Gómez',
                assignment_date: new Date('2024-05-01').toISOString(),
                status: 'inactive',
            },
        ];

        jest.spyOn(require('../models').ComputerAssignment, 'findAll').mockResolvedValue(assignmentsMock);

        const res = await request(app).get('/computers/assignments');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(assignmentsMock);
    });
});
