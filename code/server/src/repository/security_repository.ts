import MysqlService from "../service/mysql_service.js";
import type { Pool } from "mysql2/promise";
import type User from "../model/user.js";
import RoleRepository from "./role_repository.js";


class SecurityRepository {
    private mySQLservice = new MysqlService();
    private table = "user";


    public register = async (data: User) => {
        // dans le "data" on à le mot de passe haché et l'email

        // connexion à la base de donnée
        const connection: Pool = await this.mySQLservice.connect();
        // création de la transaction
        const transaction = await connection.getConnection();
        try {
            // début de la transaction
            await transaction.beginTransaction();
            const query = `INSERT INTO ${process.env.MYSQL_DB}.${this.table} VALUES (NULL, :firstname, :email, :password, :role_id)`;
            // par default le role_id est 2 

            // l'envoie de la requête à la base de donnée
            const result = await connection.execute(query, data);

            // validation de la transaction
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            return error;
        }
    };


    public getUserByEmail = async (data: User) => {
        // connexion à la base de donnée
        const connection: Pool = await this.mySQLservice.connect();
        const query = `SELECT ${this.table}.* FROM ${process.env.MYSQL_DB}.${this.table} WHERE ${this.table}.email = :email`
        try {
            // remplace automatiquement :email par la valeur correspondante dans l’objet data
            const results = await connection.execute(query, data);

            const fullResult: User | undefined = (results.shift() as User[]).shift()
            // le shift permet de récupérer le premier élément d'un tableau

            const role = await new RoleRepository().selectOne({ id: (fullResult as User).role_id, });
            // cette ligne récupère le rôle de l'utilisateur en fonction de l'id du rôle stocké dans la base de données

            (fullResult as User).role = role;
            return fullResult;
        } catch (error) {


            return error;
        }
    }
}
export default SecurityRepository;
