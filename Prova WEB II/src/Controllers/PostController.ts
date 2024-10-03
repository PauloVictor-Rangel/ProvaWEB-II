import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostController {
    async listaPost(req: Request, res: Response) {
        try {
            const posts = await prisma.post.findMany();
            res.json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error });
        }
    }

    async criaPost(req: Request, res: Response) {
        try {
            const { title, content, published, authorId } = req.body;

            if (!title || !authorId) {
                return res.status(400).json({ message: "Título e ID do autor são necessários." });
            }

            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    published: published ?? false,
                    author: { connect: { id: authorId } },
                },
            });

            res.status(201).json({ newPost });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error });
        }
    }

    async atualizaPost(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const body = req.body;

            if (isNaN(id)) {
                return res.status(400).json({ message: "ID do post inválido." });
            }

            const updatedPost = await prisma.post.update({
                where: { id },
                data: body,
            });

            res.json({ updatedPost });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ error });
        }
    }

    async deletaPost(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            await prisma.post.delete({ where: { id } });

            res.status(200).json({ message: "Post deletado com sucesso." });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: "Falha ao deletar o post." });
        }
    }
}

export default new PostController();