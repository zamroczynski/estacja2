export const rowsPreferences: Array<{
  id: number;
  name: string;
  shift: string;
  date: string;
  availability: boolean;
  description: string;
}> = [
  {
    id: 1,
    name: "Pracownik 1",
    availability: true,
    date: "2023-04-11",
    description: "",
    shift: "Dniówka",
  },
  {
    id: 2,
    name: "Pracownik 2",
    availability: false,
    date: "2023-04-20",
    description: "",
    shift: "Dniówka",
  },
  {
    id: 3,
    name: "Pracownik 1",
    availability: false,
    date: "2023-04-15",
    description: "Mam chlanie umówione",
    shift: "Nocka",
  },
];
