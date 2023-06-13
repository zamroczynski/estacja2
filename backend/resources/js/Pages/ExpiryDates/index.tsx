import * as React from "react";
import { Head } from "@inertiajs/react";
import { Tab, Tabs, ThemeProvider } from "@mui/material";

import {
    TabPanel,
    TableExpiryDates,
    AddExpiryDateForm,
    AddProductForm,
    TableProducts,
    ManageTableExpiryDates,
    ReportExpiryDateForm,
} from "./Partials";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DarkTheme from "@/Themes/DarkTheme";

export default function index({
    auth,
    expiryDates,
}: PageProps<{ expiryDates: any }>) {
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Terminy
                </h2>
            }
        >
            <Head title="Terminy" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg dark:text-white">
                        <ThemeProvider theme={DarkTheme}>
                            <div className="flex justify-center items-center">
                                <Tabs
                                    value={tabValue}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    sx={{ color: "white" }}
                                >
                                    <Tab label="Terminy" />
                                    <Tab label="Dodaj termin" />
                                    <Tab label="Dodaj Produkt" />
                                    <Tab label="Lista Produktów" />
                                    <Tab label="Zarządzaj" />
                                    <Tab label="Raport" />
                                </Tabs>
                            </div>
                            <TabPanel value={tabValue} index={0}>
                                <TableExpiryDates />
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <AddExpiryDateForm />
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                <AddProductForm />
                            </TabPanel>
                            <TabPanel value={tabValue} index={3}>
                                <TableProducts />
                            </TabPanel>
                            <TabPanel value={tabValue} index={4}>
                                <ManageTableExpiryDates />
                            </TabPanel>
                            <TabPanel value={tabValue} index={5}>
                                <ReportExpiryDateForm />
                            </TabPanel>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
