import { Router } from 'express';
import PostController from '../Controllers/PostController';

const PostRoutes = Router();

PostRoutes.get("/post", PostController.listaPost);//Lista Posts

PostRoutes.post("/post", PostController.criaPost);//Cria Posts

PostRoutes.put("/post/:id", PostController.atualizaPost);//Atualiza Posts

PostRoutes.delete("/post/:id", PostController.deletaPost);//Deleta Posts



export default PostRoutes;
