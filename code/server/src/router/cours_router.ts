import express, { type Request, type Response, type Router } from "express";
import CoursController from "../controller/cours_controller.js";


class UserRouter{
    private router: Router = express.Router();

    public getRouterList = () => {
        this.router.get("/", new CoursController().index);
        this.router.get("/:id", new CoursController().one);
        
        return this.router
    }
}
export default UserRouter;