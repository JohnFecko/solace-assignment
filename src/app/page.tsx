"use client";

import FormattedPhoneNumber from "@/components/formattedPhoneNumber";
import SortableColumnHeader from "@/components/sortableColumnHeader";
import Advocate from "@/interfaces/advocate";
import advocateService from "@/services/advocateService";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Array<Advocate>>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>(''); // Default to sorting by the first column (Name)
  const [sortDirection, setSortDirection] = useState<number>(1); // Default to ascending order


  useEffect(() => {
    console.log("fetching advocates...");
    advocateService.getAdvocates().then((results: Array<Advocate>) => {
      setAdvocates(results);
    });

  }, []);

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const resetSearchClick = (): void => {
    setSearchTerm("");
  };

  const onColumnSort = (column: string): void => {
    let direction = -sortDirection;
    if (sortColumn === '' || column !== sortColumn) {
      direction = 1;
    }

    let sorted = advocates.toSorted((a: Advocate, b: Advocate) => {
      switch (column) {
        case 'name': // Name
          return a.lastName.localeCompare(b.lastName) * direction;

        case 'experience':
          return (a.yearsOfExperience > b.yearsOfExperience ? 1 : -1) * -direction;
      }
      return 1;
    });
    setAdvocates(sorted);
    setSortColumn(column);
    setSortDirection(direction);
  }



  return (
    <main className="p-12 font-sans">
      <h1 className="font-[Solace] text-4xl text-center">Solace Advocates</h1>
      <div className="flex justify-end">
        <div>
          <input placeholder="Search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2 " value={searchTerm} onChange={searchOnChange} />
          <button onClick={resetSearchClick} className="text-white bg-[#285e50] border border-gray-300 focus:outline-none hover:bg-[#347866] focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Reset</button>
        </div>
      </div>
      <table className="w-full text-[#333] bg-[#d4e2dd40] ">
        <thead className="bg-[#3f937c] text-white">
          <tr className="h-8">
            <SortableColumnHeader columnName="Name" onColumnSort={() => onColumnSort('name')} />
            <th>City</th>
            <SortableColumnHeader columnName="Years of Experience" onColumnSort={() => onColumnSort('experience')} />
            <th>Phone Number</th>
            <th className="w-2/5">Specialties</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (advocateService.isSearchMatch(advocate, searchTerm) &&
              <tr key={advocate.id} className="text-center even:bg-gray-200 odd:bg-white">
                <td>{advocate.firstName} {advocate.lastName} {advocate.degree}</td>
                <td>{advocate.city}</td>
                <td>{advocate.yearsOfExperience}</td>
                <td><FormattedPhoneNumber phoneNumber={advocate.phoneNumber} /></td>
                <td className="flex flex-wrap justify-center gap-2">
                  {advocate.specialties.map((s, index) => (
                    <span key={index} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">{s}</span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main >
  );
}
