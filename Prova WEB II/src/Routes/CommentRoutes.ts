import { Router } from 'express';
import CommentController from '../Controllers/CommentController';

const CommentRoutes = Router();

CommentRoutes.get("/comment", CommentController.listaComment);//Lista Comment

CommentRoutes.post("/comment", CommentController.criaComment);//Cria Comment

CommentRoutes.put("/comment/:id", CommentController.atualizaComment);//Atualiza Comment

CommentRoutes.delete("/comment/:id", CommentController.deletaComment);//Deleta Comment



export default CommentRoutes;