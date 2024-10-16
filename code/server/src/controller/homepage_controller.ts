import type { Request, Response } from "express";
import HomepageRepository from "../repository/homepage_repository.js";

class HomepageController {
    private homepageRepository: HomepageRepository = new HomepageRepository();
	public get = async (req: Request, res: Response): Promise<Response> => {
		const results = await this.homepageRepository.selectAll();
		if (results instanceof Error) { return process.env.NODE_ENV === "dev"? res.json(results) : res.status(400).json({status: 400, message: "Error",});
		}
		return res.status(200).json({status: 200, message: "OK", data: results,});
	};
}
export default HomepageController;