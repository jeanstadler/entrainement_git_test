import { createConnection } from "mysql2";
import MysqlService from "../service/mysql_service.js";
import mysql, { type QueryResult, type Pool } from "mysql2/promise";

class HomepageRepository {
	private mySQLService = new MysqlService();
	private table = "cours";

	public selectAll = async (): Promise<QueryResult | unknown> => {
		// console.log("oui repository");

		const connection: Pool = await this.mySQLService.connect();
		const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table};`;
		
		try {
			const results = await connection.execute(query);
			return results.shift();
		} catch (error) {
			// console.log("oui erreur");
			
			return error;
		}
	};
}

export default HomepageRepository;
