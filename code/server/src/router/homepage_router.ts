
import express, { type Router, type Express, type Request, type Response } from "express";
import HomepageController from "../controller/homepage_controller.js";

class HomepageRouter {
    private router: Router = express.Router();

    public getRoutesList = (): Router => {
        this.router.get("/", new HomepageController().get);
        return this.router;
    };
}
export default HomepageRouter;


