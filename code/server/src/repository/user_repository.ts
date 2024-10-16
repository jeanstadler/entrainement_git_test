import { createConnection } from "mysql2";
import MysqlService from "../service/mysql_service.js";
import mysql, { type QueryResult, type Pool } from "mysql2/promise";

import Role from "../model/role.js";
import type User from "../model/user.js";



class UserRepository {
    private mySQLService = new MysqlService();
    private table = "user";

    public selectAll = async (): Promise<QueryResult | unknown> => {
        // public selectAll = async (): Promise<QueryResult | unknown> => {
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
    public create = async (data: User) => {

        const connection: Pool = await this.mySQLService.connect();
        const transaction = await connection.getConnection();
        try {
            await transaction.beginTransaction();

            const query = `INSERT INTO ${process.env.MYSQL_DB}.${this.table} VALUE (NULL, :firstname, :email, :password, :role_id);`;
            console.log(data);
            const results = await connection.execute(query, data);
            await transaction.commit();
            return results;

        } catch (error) {
            console.log("ici problème ", error);
            await transaction.rollback();
            return error;
        }
    }
}

export default UserRepository;