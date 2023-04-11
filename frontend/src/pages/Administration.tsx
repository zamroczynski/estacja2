import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicTableExpiryDates from "../components/BasicTableExpiryDates";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-GB";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import AdminTableEmployees from "../components/AdminTableEmployees";
import AdminTableGuides from "../components/AdminTableGuides";
import { Container } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const colsEmployees: Array<string> = [
  "Imię i Nazwisko",
  "eMail",
  "Uprawnienia",
  "Nazwa konta",
  "Telefon",
];
const rowsEmployees: Array<{
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
];

const colsGuides: Array<string> = [
  "Tytuł",
  "Utworzony",
  "Ostatnia Aktualizacja",
  "Publiczny",
];
const rowsGuides: Array<{
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  public: boolean;
  body: string;
}> = [
  {
    id: 1,
    name: "Test1",
    createdAt: "2023-04-11 20:21:18",
    updatedAt: "2023-04-11 20:21:18",
    public: false,
    body: "Test1",
  },
  {
    id: 2,
    name: "Test2",
    createdAt: "2023-04-10 16:11:55",
    updatedAt: "2023-04-11 20:21:18",
    public: true,
    body: "Test2",
  },
  {
    id: 3,
    name: "Lorem ipsum",
    createdAt: "2023-04-09 09:01:00",
    updatedAt: "2023-04-09 20:30:42",
    public: false,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim ante vitae metus porta, non laoreet arcu tempus. Vestibulum eleifend ante eros, id sodales ante elementum nec. Curabitur eu sem id magna pellentesque facilisis quis tincidunt lacus. Fusce interdum id sem ut bibendum. Mauris egestas mi ac mi vestibulum, nec euismod neque blandit. Nam feugiat malesuada porttitor. Nulla nec dolor non lacus faucibus porttitor. Ut hendrerit ipsum id libero pulvinar pulvinar. Vestibulum consequat metus non ipsum aliquet, porttitor dignissim neque euismod. Morbi mi augue, ullamcorper quis euismod id, vehicula a eros. Suspendisse vitae magna luctus, rhoncus sapien ac, vehicula tortor. Proin sed purus in urna feugiat tincidunt eget sed arcu. Vivamus nec ullamcorper metus. Maecenas id ipsum nec odio ultricies tempus auctor nec dui. Aenean interdum tincidunt magna, a ultricies ligula consequat sed. Integer vitae nisi facilisis, tincidunt tellus a, consectetur odio. Fusce vitae tempor est, ac dictum turpis. Curabitur at metus vel nisi auctor porttitor. Integer laoreet, libero at tristique pellentesque, nisi turpis rhoncus lectus, convallis sagittis augue sem in ante. Proin tortor lectus, elementum id congue ultricies, lobortis ut velit. Duis commodo sollicitudin tellus ac pulvinar. Donec id tincidunt justo. Sed vel erat quis elit vulputate accumsan vel vel augue. Suspendisse nisi felis, iaculis eget convallis vel, euismod fermentum augue. Nunc sit amet felis in erat pellentesque ultricies. Fusce eu ornare turpis. Morbi leo urna, tincidunt eu pharetra ut, dignissim in augue. Nunc semper eget dui nec aliquam. Proin et turpis non nisl commodo volutpat non eget urna. Aliquam erat volutpat. Morbi scelerisque, mauris et fermentum dapibus, felis felis auctor sem, ac lacinia risus lorem non odio. Ut orci nibh, vestibulum non diam non, malesuada egestas ante. Suspendisse porta leo nisl, eu tincidunt nibh convallis ut. Morbi quis scelerisque quam. Nam cursus lectus ac quam pulvinar malesuada sed a arcu. Integer eget imperdiet elit. Mauris varius, arcu a pharetra placerat, magna felis ullamcorper lacus, tristique posuere quam erat et nisi. Ut ut urna tempus, auctor enim eget, aliquam metus. Morbi vitae posuere urna. Aliquam placerat eleifend ante vitae tempor. Integer vel magna nec sapien rutrum bibendum nec ut justo. Mauris aliquam, felis rutrum ultrices feugiat, nulla nibh commodo neque, non euismod dui massa eget risus. Suspendisse vitae accumsan dolor. Nullam posuere bibendum magna et venenatis. Nullam velit massa, rutrum vel purus sagittis, cursus elementum magna. Ut at ultrices leo, ultrices condimentum metus. In tempor vel felis quis dictum. Quisque nec pretium ex. Nunc ornare interdum lacus vitae varius. Pellentesque ullamcorper neque pretium eros dictum mollis. Vivamus at sapien id magna imperdiet sagittis nec et tellus. Vivamus dui dui, aliquam et augue ac, sagittis condimentum massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper ipsum eget condimentum sodales. Pellentesque urna nisi, dapibus nec nibh non, condimentum euismod neque.Duis consequat tincidunt justo, et hendrerit neque maximus vitae. Etiam id nisi dapibus, porta lorem vitae, lobortis massa. Vivamus elementum, diam porta rhoncus convallis, erat augue eleifend enim, eget pretium mauris dolor vel lectus. Donec libero tortor, dapibus eget condimentum in, lacinia vitae metus. Ut non lacus ac ex euismod porta sed non nulla. Donec aliquet ipsum turpis, quis pretium elit pharetra eget. Vestibulum sed bibendum massa, nec semper dui. Aenean malesuada, orci vel scelerisque semper, mi ex faucibus augue, mattis aliquet nibh metus eu diam. Suspendisse rutrum dapibus velit nec maximus. Maecenas eleifend, enim quis pellentesque blandit, diam libero pretium dolor, semper eleifend orci purus sed ex. Vivamus aliquam ex et justo mattis, et sollicitudin ipsum tincidunt.",
  },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Container>
      )}
    </div>
  );
}

const Administration: React.FC = () => {
  const today = dayjs();
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <div>
      <div className="flex justify-center items-center w-screen">
        <h1 className="text-4xl font-extrabold font-sans text-stone-500 uppercase">
          Administracja
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Pracownicy" />
          <Tab label="Podręczniki" />
          <Tab label="Planogramy" />
          <Tab label="Wiadomości" />
          <Tab label="Zadania" />
          <Tab label="Grafik" />
        </Tabs>
      </div>
      <TabPanel value={tabValue} index={0}>
        <AdminTableEmployees cols={colsEmployees} rows={rowsEmployees} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <AdminTableGuides cols={colsGuides} rows={rowsGuides} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Planogramy
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        Wiadomości
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        Zadania
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        Grafik
      </TabPanel>
    </div>
  );
};

export default Administration;
