import { Router } from 'express';
import UserController from '../Controllers/UserController';

const UserRoutes = Router();

UserRoutes.get("/user", UserController.listaUser);//Lista Usuário

UserRoutes.post("/user", UserController.criaUser);//Cria Usuário

UserRoutes.put("/user/:id", UserController.atualizaUser);//Atualiza Usuário

UserRoutes.delete("/user/:id", UserController.deletaUser);//Deleta Usuário


export default UserRoutes;
