import Advocate from "@/interfaces/advocate";
import { ne } from "drizzle-orm";

class AdvocateService {
    static async getAdvocates(): Promise<Array<Advocate>> {
        const response = await fetch("/api/advocates");
        if (response.ok) {
            const json = await response.json();
            return json.data as Array<Advocate>;
        }
        return [];
    }

    static isSearchMatch(advocate: Advocate, searchTerm: string): boolean {
        if (searchTerm.trim() === "") {
            return true;
        }
        return (
            advocate.firstName.includes(searchTerm) ||
            advocate.lastName.includes(searchTerm) ||
            advocate.city.includes(searchTerm) ||
            advocate.degree.includes(searchTerm) ||
            advocate.specialties.includes(searchTerm) ||
            advocate.yearsOfExperience?.toString().includes(searchTerm)
        );
    }
};

export default AdvocateService;