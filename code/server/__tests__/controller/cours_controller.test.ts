import { describe, it, expect } from 'vitest'; // Ajout de l'importation
import supertest, { type Response } from "supertest";
import Server from '../../src/core/server.js';

// const app = new Server().createServer();

describe('CoursController', () => {
	it("je veux retourner un status code 200 pour le courss", async () => {
		const expected = 200;
		// sut (system under test)
		const sut: Response = await supertest(new Server().createServer()).get(
			"/cours",
		);

		// console.log(sut);

		expect(sut.status).toBe(expected);
	});
	it("je veux retourner un status code 200 pour le premier cours", async () => {
		const expected = 200;
		// sut (system under test)
		const sut: Response = await supertest(new Server().createServer()).get(
			"/cours/1",
		);

		// console.log(sut);

		expect(sut.status).toBe(expected);
	});
});

