import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
import AdminTableExpiryDates from "../components/AdminTableExpiryDates";
import Container from "@mui/material/Container/Container";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const cols: Array<string> = ["Nazwa", "Data", "Ilość"];
const rows: Array<{ id: number; name: string; date: string; amount: string }> =
  [
    {
      id: 1,
      name: "Pepsi 0,5",
      date: "04.04.2023",
      amount: " ",
    },
    {
      id: 2,
      name: "CocaCola 0,5",
      date: "04.04.2023",
      amount: "1",
    },
    {
      id: 3,
      name: "CocaCola 0,5 CocaCola 0,5 CocaCola 0,5 CocaCola 0,5",
      date: "05.04.2023",
      amount: "555",
    },
  ];

const products: Array<{ id: number; name: string }> = [
  {
    id: 1,
    name: "Pepsi 0,5",
  },
  {
    id: 2,
    name: "CocaCola 0,5",
  },
  {
    id: 3,
    name: "Piwo Żubr 0,5",
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

const ExpiryDates: React.FC = () => {
  const today = dayjs();
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <div>
      <div className="flex justify-center items-center w-screen">
        <h1 className="text-4xl font-extrabold font-sans text-stone-500 uppercase">
          Terminy
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
          <Tab label="Lista" />
          <Tab label="Terminy" />
          <Tab label="Produkty" />
          <Tab label="Zarządzaj" />
          <Tab label="Raport" />
        </Tabs>
      </div>
      <TabPanel value={tabValue} index={0}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Wybierz datę"
              className="mb-3"
              defaultValue={today}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <BasicTableExpiryDates cols={cols} rows={rows} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Box component="form" noValidate autoComplete="off">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Wybierz datę"
                className="mt-4"
                defaultValue={today}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Autocomplete
            className="mt-4"
            multiple
            options={products}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Wybierz produkt"
                placeholder="Favorites"
              />
            )}
          />
          <TextField
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
            label="Ilość"
            className="mt-4"
          />
          <Button variant="contained" className="mt-4 bg-lime-700 w-full">
            Dodaj termin
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <TextField label="Nazwa" variant="outlined" fullWidth />
        <Button variant="contained" className="mt-4 bg-lime-700 w-full">
          Dodaj produkt
        </Button>
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <AdminTableExpiryDates cols={cols} rows={rows} />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Box>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Wybierz datę od"
                className="mt-4"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Wybierz datę do"
                className="mt-4"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button variant="contained" className="mt-4 bg-lime-700 w-full">
            Generuj raport
          </Button>
        </Box>
      </TabPanel>
    </div>
  );
};

export default ExpiryDates;
