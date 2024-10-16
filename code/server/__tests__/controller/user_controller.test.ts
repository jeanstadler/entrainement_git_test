import { describe, it, expect } from "vitest";
import supertest, { type Response } from "supertest";
import Server from "../../src/core/server.js";
import jwt from "jsonwebtoken";
import type Role from "../../src/model/role.js";
import type User from "../../src/model/user.js";

// Créer un groupe de tests
describe("UserController tests suite", () => {
	// Route principale appelée par les tests de ce fichier
	const route = "/user";

	// Créer un utilisateur administrateur
	const role: Role = {
		id: 1,
		name: "admin",
	};

	const admin2: User = {
		id: 3,
		email: "admin2@gmail.com",
		password: "mot_de_passe_admin2",
		role_id: 1,
		role: role,
	};

	const data: User = {
		firstname: "firstname_test",
		email: `test_${Date.now()}@admin.com`, // J'utilise le timestamp pour rendre l'email unique
		password: "mot_de_passe_test",
		role_id: 2
	};

	// Créer un test pour vérifier le statut de la récupération des utilisateurs
	it("doit retourner un status code 200 pour la récupération des utilisateurs", async () => {
		const expected = 200;
		const sut: Response = await supertest(new Server().createServer()).get(route);
		expect(sut.status).toBe(expected);
	});

	// Créer un test pour vérifier que des données sont retournées
	it("doit retourner des données lors de la récupération des utilisateurs", async () => {
		const minValue = 0;
		const sut: Response = await supertest(new Server().createServer()).get(route);
		const actual = sut.body.data.length;
		expect(actual).toBeGreaterThan(minValue);
	});

	it("créer un utilisateur", async () => {
		// Valeur attendue
		const expected = 201;

		// Générer un JWT valide pour admin2
		const token = jwt.sign(
			{
				user: {
					id: admin2.id,
					email: admin2.email,
					role_id: admin2.role_id,
					role: admin2.role,
				},
			},
			process.env.SECRET as string,
			{
				expiresIn: "1h",
			},
		);

		// Sut
		const sut: Response = await supertest(new Server().createServer())
			.post(route)
			.set("Authorization", `Bearer ${token}`)
			.send(data);

		// console.log(sut);


		const actual = sut.status;

		// Assertion
		expect(actual).toBe(expected);

	});
});
