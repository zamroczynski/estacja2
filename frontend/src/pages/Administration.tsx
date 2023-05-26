import * as React from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { redirect } from "react-router-dom";
import {
  AdminTableTasks,
  AdminTableEmployees,
  AdminTableGuides,
  AdminTablePlanograms,
  AdminSchedule,
} from "../components";

//data
import { colsGuides, rowsGuides } from "./data/guides";
import { colsEmployees, rowsEmployees } from "./data/employees";
import { colsPlanograms, rowsPlanograms } from "./data/planograms";
import { colsTasks, rowsTasks } from "./data/tasks";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
  const [error, setError] = React.useState("");
  const API_URL: string = import.meta.env.VITE_API_URL;
  const signOut = useSignOut();
  const authHeader = useAuthHeader();
  const axiosConfig = {
    headers: { Authorization: authHeader() },
  };
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      try {
        const response = axios
          .get(API_URL + "user", axiosConfig)
          .then((response) => {
            console.log(response.data);
          });
      } catch (err) {
        if (err && err instanceof AxiosError) {
          setError(err.response?.data.message);
          if (err.response?.status === 401) {
            signOut();
            return redirect("/");
          }
        } else if (err instanceof Error) setError(err.message);
        console.error("Error: ", err);
      }
    }
    console.log(newValue);
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
        <AdminTablePlanograms cols={colsPlanograms} rows={rowsPlanograms} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        Wiadomości
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <AdminTableTasks cols={colsTasks} rows={rowsTasks} />
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <AdminSchedule />
      </TabPanel>
    </div>
  );
};

export default Administration;
