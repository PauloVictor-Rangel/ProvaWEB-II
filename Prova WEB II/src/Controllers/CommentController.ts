import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentController {
    async listaComment(req: Request, res: Response) {
        try {
            const comments = await prisma.comment.findMany();
            res.json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ error });
        }
    }

    async criaComment(req: Request, res: Response) {
        try {
            const { content, postId, authorId } = req.body;

            if (!content || !postId || !authorId) {
                return res.status(400).json({ message: "Conteúdo, ID do post e ID do autor são obrigatórios." });
            }

            const newComment = await prisma.comment.create({
                data: {
                    content,
                    post: { connect: { id: postId } },
                    author: { connect: { id: authorId } },
                },
            });

            res.status(201).json({ newComment });
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ error });
        }
    }

    async atualizaComment(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const body = req.body;

            const updatedComment = await prisma.comment.update({
                where: { id },
                data: body,
            });

            res.json({ updatedComment });
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).json({ error });
        }
    }

    async deletaComment(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            await prisma.comment.delete({ where: { id } });

            res.status(200).json({ message: "Comentário deletado com sucesso." });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ message: "Falha ao deletar o comentário." });
        }
    }
}

export default new CommentController();