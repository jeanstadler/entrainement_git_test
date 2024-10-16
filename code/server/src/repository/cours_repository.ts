import { createConnection } from "mysql2";
import MysqlService from "../service/mysql_service.js";
import mysql, { type QueryResult, type Pool } from "mysql2/promise";
import type Cours from "../model/cours.js";

class CoursRepository {
    private mySQLService = new MysqlService();
    private table = "cours";

    public selectAll = async (): Promise<QueryResult | unknown> => {
        const connection: Pool = await this.mySQLService.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table};`

        try {
            const result = await connection.execute(query);
            return result.shift();
        } catch (error) {
            return error;
        }
    }

    public selectOne = async (data: object): Promise<QueryResult | unknown> => {
        const connection: Pool = await this.mySQLService.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table} WHERE ${this.table}.id = :id;`

        try {
            const result = await connection.execute(query, data);
            return result.shift();
        } catch (error) {
            return error;
        }
    }

}

export default CoursRepository;