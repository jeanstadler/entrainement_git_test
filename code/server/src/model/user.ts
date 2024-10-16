import type Role from "./role.js";

type User = {
	id?: number;
	firstname?: string;
	email?: string;
	password?: string;
	role_id?: number;
	role?: Role | unknown;
};
export default User;
