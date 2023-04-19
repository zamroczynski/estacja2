import * as React from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import {
  AdminTableTasks,
  AdminTableEmployees,
  AdminTableGuides,
  AdminTablePlanograms,
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
        <AdminTablePlanograms cols={colsPlanograms} rows={rowsPlanograms} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        Wiadomości
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <AdminTableTasks cols={colsTasks} rows={rowsTasks} />
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        Grafik
      </TabPanel>
    </div>
  );
};

export default Administration;
