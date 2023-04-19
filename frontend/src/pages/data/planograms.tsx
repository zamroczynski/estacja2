export const colsPlanograms: Array<string> = [
  "Nazwa",
  "Aktualny",
  "Obowiązuje od",
  "Przypisany pracownik",
];

export const rowsPlanograms: Array<{
  id: number;
  name: string;
  current: boolean;
  effectiveFrom: string;
  employees: string;
}> = [
  {
    id: 1,
    name: "Test1",
    current: true,
    effectiveFrom: "2023-04-11",
    employees: "Damian Zamorczynski",
  },
  {
    id: 2,
    name: "Test2",
    current: true,
    effectiveFrom: "2023-04-01",
    employees: "Janek Testowy",
  },
  {
    id: 3,
    name: "Fiflok",
    current: false,
    effectiveFrom: "2023-01-01",
    employees: "Damian Zamorczynski",
  },
];
