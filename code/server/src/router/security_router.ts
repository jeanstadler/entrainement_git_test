import express, { type Router } from "express";
import SecurityController from "../controller/security_controller.js";


class SecurityRouter{
    private router:Router = express.Router();

    public getRoutesList = (): Router =>{
        this.router.post("/register", new SecurityController().register);
        this.router.post("/login", new SecurityController().login);
        this.router.post("/auth", new SecurityController().auth);
        return this.router;
    }
}
export default SecurityRouter