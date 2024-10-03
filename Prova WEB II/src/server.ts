import express from 'express';
import userRoutes from './Routes/UserRoutes';
import postRoutes from './Routes/PostRoutes';
import commentRoutes from './Routes/CommentRoutes';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta 3000`);
});
