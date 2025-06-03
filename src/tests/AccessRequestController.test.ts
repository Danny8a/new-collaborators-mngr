import {Request, Response} from 'express';
import {AccessRequest, User} from '../models';
import {
    createAccessRequest,
    getAllAccessRequests,
    getAccessRequestsByUser,
    updateAccessRequestStatus,
} from '../controllers/AccessRequestController';

jest.mock('../models');

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
};

describe('AccessRequestController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createAccessRequest', () => {
        it('should create an access request if the user exists', async () => {
            const req = {
                body: {
                    user_id: 1,
                    request_type: 'tipo',
                    applications: ['app1'],
                    justification: 'justificación',
                },
            } as Request;
            const res = mockResponse();

            (User.findByPk as jest.Mock).mockResolvedValue({name: 'Usuario'});
            (AccessRequest.create as jest.Mock).mockResolvedValue({id: 1});

            await createAccessRequest(req, res);

            expect(User.findByPk).toHaveBeenCalledWith(1);
            expect(AccessRequest.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return 404 if the user does not exist', async () => {
            const req = {body: {user_id: 2}} as Request;
            const res = mockResponse();

            (User.findByPk as jest.Mock).mockResolvedValue(null);

            await createAccessRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: 'User not found'});
        });
    });

    describe('getAllAccessRequests', () => {
        it('should return all access requests', async () => {
            const req = {} as Request;
            const res = mockResponse();

            (AccessRequest.findAll as jest.Mock).mockResolvedValue([{id: 1}]);

            await getAllAccessRequests(req, res);

            expect(AccessRequest.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith([{id: 1}]);
        });
    });

    describe('getAccessRequestsByUser', () => {
        it('should return requests by user', async () => {
            const req = {params: {userId: 1}} as unknown as Request;
            const res = mockResponse();

            (AccessRequest.findAll as jest.Mock).mockResolvedValue([{id: 2}]);

            await getAccessRequestsByUser(req, res);

            expect(AccessRequest.findAll).toHaveBeenCalledWith({
                where: {user_id: 1},
                order: [['created_at', 'DESC']],
            });
            expect(res.json).toHaveBeenCalledWith([{id: 2}]);
        });
    });

    describe('updateAccessRequestStatus', () => {
        it('should update the status of the request', async () => {
            const req = {params: {id: 1}, body: {status: 'aprobado'}} as unknown as Request;
            const res = mockResponse();

            const mockRequest = {update: jest.fn().mockResolvedValue({}), id: 1};
            (AccessRequest.findByPk as jest.Mock).mockResolvedValue(mockRequest);

            await updateAccessRequestStatus(req, res);

            expect(AccessRequest.findByPk).toHaveBeenCalledWith(1);
            expect(mockRequest.update).toHaveBeenCalledWith({status: 'aprobado'});
            expect(res.json).toHaveBeenCalledWith({message: 'Access request updated', request: mockRequest});
        });

        it('should return 404 if the access request does not exist', async () => {
            const req = {params: {id: 2}, body: {status: 'rechazado'}} as unknown as Request;
            const res = mockResponse();

            (AccessRequest.findByPk as jest.Mock).mockResolvedValue(null);

            await updateAccessRequestStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: 'Access request not found'});
        });
    });

    describe('Controller error handling (catch blocks)', () => {
        it('should return 500 if an error occurs while creating a request', async () => {
            const req = {body: {user_id: 1}} as Request;
            const res = mockResponse();

            (User.findByPk as jest.Mock).mockRejectedValue(new Error('DB error'));

            await createAccessRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({message: 'Error creating access request'}));
        });

        it('should return 500 if an error occurs while fetching all requests', async () => {
            const req = {} as Request;
            const res = mockResponse();

            (AccessRequest.findAll as jest.Mock).mockRejectedValue(new Error('DB error'));

            await getAllAccessRequests(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({message: 'Error fetching access requests'}));
        });

        it('should return 500 if an error occurs while fetching user requests', async () => {
            const req = {params: {userId: 1}} as unknown as Request;
            const res = mockResponse();

            (AccessRequest.findAll as jest.Mock).mockRejectedValue(new Error('DB error'));

            await getAccessRequestsByUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({message: 'Error fetching requests for user'}));
        });

        it('should return 500 if an error occurs while updating the request status', async () => {
            const req = {params: {id: 1}, body: {status: 'aprobado'}} as unknown as Request;
            const res = mockResponse();

            (AccessRequest.findByPk as jest.Mock).mockRejectedValue(new Error('DB error'));

            await updateAccessRequestStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({message: 'Error updating access request'}));
        });
    });
});
