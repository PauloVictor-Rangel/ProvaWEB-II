import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
    async listaUser(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async criaUser(req: Request, res: Response) {
        try {
            const { email, password, name, profile_image, bio } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email e senha são obrigatórios.",
                });
            }

            const newUser = await prisma.user.create({
                data: { email, password, name, profile_image, bio },
            });

            res.status(201).json({ newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async atualizaUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const body = req.body;

            const updatedUser = await prisma.user.update({
                where: { id },
                data: body,
            });

            res.status(200).json({ updatedUser });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async deletaUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            await prisma.user.delete({ where: { id } });

            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default new UserController();