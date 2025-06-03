import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/users';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('UserController', () => {
    it('GET /users should return 200', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
    });

    it('POST /users should create a user and return 201', async () => {
        const User = require('../models').User;

        jest.spyOn(User, 'create').mockResolvedValue({ id: 1, name: 'Juan', status: 'pendiente' });

        const res = await request(app)
            .post('/users')
            .send({ name: 'Juan', status: 'pendiente' });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Juan');
    });

    it('POST /users should handle errors and return 500', async () => {
        const User = require('../models').User;
        jest.spyOn(User, 'create').mockRejectedValue(new Error('DB error'));

        const res = await request(app)
            .post('/users')
            .send({ name: 'Juan', status: 'pendiente' });

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error al crear el usuario');
    });

    it('PUT /users/:id should update a user and return the updated user', async () => {
        const User = require('../models').User;
        type MockUser = {
            id: number;
            name: string;
            email: string;
            area: string;
            role: string;
            update: jest.Mock<Promise<MockUser>, [Partial<MockUser>]>;
        };

        const mockUser: MockUser = {
            id: 1,
            name: 'Juan',
            email: 'juan@correo.com',
            area: 'TI',
            role: 'admin',
            update: jest.fn(),
        };
        mockUser.update.mockResolvedValue(mockUser);

        jest.spyOn(User, 'findByPk').mockResolvedValue(mockUser);
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        const res = await request(app)
            .put('/users/1')
            .send({ name: 'Juan Actualizado', email: 'juan@correo.com', area: 'TI', role: 'admin' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
        expect(mockUser.update).toHaveBeenCalledWith({
            name: 'Juan Actualizado',
            email: 'juan@correo.com',
            area: 'TI',
            role: 'admin'
        });
    });
});
