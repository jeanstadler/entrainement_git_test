import type Eleve from "./eleve.js";
import type Prof from "./prof.js";

type Cours = {
	id?: number;
	name?: string;
	eleve_id?: number;
	eleve?: Eleve | unknown;
    prof_id?: number;
	prof?: Prof | unknown;
};
export default Cours;
