import { Request, Response } from 'express';
import { AccessRequest, User } from '../models';
import { sendEmail } from '../services/email.service';

export const createAccessRequest = async (req: Request, res: Response) => {
    const { user_id, request_type, applications, justification } = req.body;

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newRequest = await AccessRequest.create({
            user_id,
            user_name: user.name,
            request_type,
            applications,
            justification,
            status: 'pending',
        });

        res.status(201).json(newRequest);
    } catch (error) {
        console.error('Error en createAccessRequest:', error);
        res.status(500).json({ message: 'Error creating access request', error });
    }
};

export const getAllAccessRequests = async (_req: Request, res: Response) => {
    try {
        const requests = await AccessRequest.findAll({ order: [['created_at', 'DESC']] });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching access requests', error });
    }
};

export const getAccessRequestsByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const requests = await AccessRequest.findAll({
            where: { user_id: userId },
            order: [['created_at', 'DESC']],
        });

        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests for user', error });
    }
};

export const updateAccessRequestStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const request = await AccessRequest.findByPk(id);

        if (!request) {
            return res.status(404).json({ message: 'Access request not found' });
        }

        await request.update({ status });

        if (['approved', 'rejected'].includes(status)) {
            const user = await User.findByPk(request.user_id);

            if (user) {
                const subject =
                    status === 'approved'
                        ? 'Tu solicitud de acceso ha sido aprobada ✅'
                        : 'Tu solicitud de acceso ha sido rechazada ❌';

                const body = `
          <p>Hola <strong>${request.user_name}</strong>,</p>
          <p>Tu solicitud de acceso ha sido <strong>${status === 'approved' ? 'aprobada' : 'rechazada'}</strong>.</p>
          <p>Gracias por usar nuestro sistema.</p>
        `;

                await sendEmail(user.email, subject, body);
            }
        }

        res.json({ message: 'Access request updated', request });
    } catch (error) {
        console.error('Error en updateAccessRequestStatus:', error);
        res.status(500).json({ message: 'Error updating access request', error });
    }
};
