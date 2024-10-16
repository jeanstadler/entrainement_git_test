import UserRepository from "../repository/user_repository.js";
import type { Request, Response } from "express";

class UserController {
    private userRepository: UserRepository = new UserRepository();

    public index = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.userRepository.selectAll();
        if (result instanceof Error) {
            return process.env.NODE_ENV === "dev" ? res.json(result) : res.status(400).json({ status: 400, message: "ERROR", });
        }
        return res.status(200).json({ status: 200, message: "OK", data: result, });
    };

    public one = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.userRepository.selectOne(req.params);
        if (result instanceof Error) {
            return process.env.NODE_ENV === "dev" ? res.json(result) : res.status(400).json({ status: 400, message: "ERROR", });
        }
        return res.status(200).json({ status: 200, message: "OK", data: result, });
    };

    public create = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.userRepository.create(req.body);
        if (result instanceof Error) {
            // console.log("ici problème");
            return process.env.NODE_ENV === "dev" ? res.json(result) : res.status(400).json({ status: 400, message: "ERROR", });
        }
        return res.status(201).json({ status: 201, message: "OK", data: result, });
    }

}
export default UserController;
