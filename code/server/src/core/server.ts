import http from "node:http";
import express, { type Router, type Express, type Request, type Response } from
    "express";
import HomepageRouter from "../router/homepage_router.js";
import cors from "cors";

import UserRouter from "../router/user_router.js";
import SecurityRouter from "../router/security_router.js";
import CoursRouter from "../router/cours_router.js";



class Server {
    private app: Express = express();
    private router: Router = express.Router();

    constructor() {
        this.router.use(express.json());
        // this.router.use(cors({origin:process.env.ORIGINS?.split(",")}));
        this.app.use(this.router);
        this.routersList();
    }
    private routersList = (): void => {

        this.router.use("/", new HomepageRouter().getRoutesList());

        this.router.use("/user", new UserRouter().getRouterList());

        this.router.use("/cours", new CoursRouter().getRouterList());

        this.router.use("/", new SecurityRouter().getRoutesList());

    };

    public createServer = (): http.Server => {
        return http.createServer(this.app);
    };
}


export default Server;