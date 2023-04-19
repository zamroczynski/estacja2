export const colsTasks: Array<string> = [
  "Nazwa",
  "Przypisany pracownik",
  "Termin",
  "Wykonano",
];

export const rowsTasks: Array<{
  id: number;
  name: string;
  description: string;
  employees: string;
  deadline: string;
  done: boolean;
  comment: Array<string>;
}> = [
  {
    id: 1,
    name: "Zadanko1",
    description: "To jest zadanie 1",
    employees: "Damian Zamorczynski",
    deadline: "19.04.2023",
    done: false,
    comment: ["się robi szefie", "będzie na jutro", "jutro już na pewno"],
  },
  {
    id: 2,
    name: "Zadanko2",
    description: "To jest zadanie 2",
    employees: "Jan Testowy",
    deadline: "22.04.2023",
    done: false,
    comment: ["się robi szefie", "będzie na jutro", "jutro już na pewno"],
  },
  {
    id: 3,
    name: "Zadanko3",
    description: "To jest zadanie 3",
    employees: "Damian Zamorczynski",
    deadline: "19.04.2023",
    done: true,
    comment: [],
  },
];
