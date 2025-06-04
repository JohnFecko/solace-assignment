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
        searchTerm = searchTerm.toLowerCase();
        return (
            advocate.firstName.toLowerCase().includes(searchTerm) ||
            advocate.lastName.toLowerCase().includes(searchTerm) ||
            advocate.city.toLowerCase().includes(searchTerm) ||
            advocate.degree.toLowerCase().includes(searchTerm) ||
            advocate.specialties.filter(x => x.toLowerCase().includes(searchTerm)).length > 0 ||
            advocate.yearsOfExperience?.toString().includes(searchTerm)
        );
    }
};

export default AdvocateService;