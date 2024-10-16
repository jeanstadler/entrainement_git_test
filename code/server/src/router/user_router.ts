import express, { type Request, type Response, type Router } from "express";
import UserController from "../controller/user_controller.js"
import AutorizationMiddleware from "../security/autorizationmiddleware.js";

class UserRouter {
    private router: Router = express.Router();
    private autorizationMiddleware: AutorizationMiddleware = new AutorizationMiddleware();

    public getRouterList = () => {
        this.router.get("/", new UserController().index);
        this.router.get("/:id", this.autorizationMiddleware.authorize(["user", "admin"]), new UserController().one);

        this.router.post("/", this.autorizationMiddleware.authorize(["admin"]), new UserController().create);

        return this.router
    }
}
export default UserRouter;