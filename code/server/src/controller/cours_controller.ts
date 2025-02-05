
import CoursRepository from "../repository/cours_repository.js";
import type { Request, Response } from "express";

class UserController{
    private coursRepository: CoursRepository = new CoursRepository();

    public index =async (req:Request, res:Response): Promise<Response> =>{
        const result = await this.coursRepository.selectAll();
        if (result instanceof Error) {
            return process.env.NODE_ENV === "dev"? res.json(result): res.status(400).json({status:400, message:"ERROR",});
        }
        return res.status(200).json({status:200, message:"OK", data:result,});
    };

    public one = async (req:Request, res:Response):Promise<Response> =>{
        const result = await this.coursRepository.selectOne(req.params);
        if (result instanceof Error) {
            return process.env.NODE_ENV === "dev"? res.json(result): res.status(400).json({status:400, message:"ERROR",});
        }
        return res.status(200).json({status:200, message:"OK", data:result,});
    };
    

}
export default UserController;