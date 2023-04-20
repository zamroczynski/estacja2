export const colsEmployees: Array<string> = [
  "Imię i Nazwisko",
  "eMail",
  "Uprawnienia",
  "Nazwa konta",
  "Telefon",
];

export const rowsEmployees: Array<{
  id: number;
  name: string;
  email: string;
  permissions: string;
  login: string;
  phone: string;
}> = [
  {
    id: 1,
    name: "Damian Zamroczynski",
    email: "damian.zamroczynski@gmail.com",
    permissions: "Administrator",
    login: "damian",
    phone: "537026035",
  },
  {
    id: 2,
    name: "Magdalena Gołembiewska",
    email: "madzia@buziaczek.pl",
    permissions: "Administrator",
    login: "madzia",
    phone: "",
  },
  {
    id: 3,
    name: "Jan Testowy",
    email: "test@test.pl",
    permissions: "Użytkownik",
    login: "jan",
    phone: "",
  },
  {
    id: 4,
    name: "Maciej Długi",
    email:
      "testBuziaczekKociaczekBuraczekKurczakiZiemnakiHamburgeryIInnekurwaaaaaaa@test.pl",
    permissions: "Użytkownik",
    login: "jan",
    phone: "",
  },
];
