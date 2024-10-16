import MysqlService from "../service/mysql_service.js";
import type { Pool, QueryResult } from "mysql2/promise";
import type Role from "../model/role.js";

class RoleRepository {
	private mySQLService = new MysqlService();
	private table = "role";

	public selectAll = async (): Promise<QueryResult | unknown | Role[]> => {
		const connection: Pool = await this.mySQLService.connect();
		const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table};`;
		try {
			const results = await connection.execute(query);
			return results.shift();
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (data: Role,): Promise<QueryResult | unknown | Role> => {
		const connection: Pool = await this.mySQLService.connect();

		const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table} WHERE ${this.table}.id = :id;`;
		try {
			const results = await connection.execute(query, data);
			return (results.shift() as []).shift();
		} catch (error) {
			return error;
		}
	};

};
export default RoleRepository;