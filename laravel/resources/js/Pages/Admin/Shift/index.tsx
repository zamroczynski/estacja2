import * as React from "react";
import { Head, Link } from "@inertiajs/react";
import { Tab, Tabs, ThemeProvider, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { AddShiftForm, ManageTableShift } from "./Partials";
import { TabPanel } from "@/Components";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DarkTheme from "@/Themes/DarkTheme";

export default function index({ auth }: PageProps<{ expiryDates: any }>) {
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Zmiany
                    </h2>
                    <Link href={route("admin")}>
                        <IconButton>
                            <ArrowBackIcon className="text-xl text-gray-800 dark:text-gray-200 leading-tight" />
                        </IconButton>
                    </Link>
                </div>
            }
        >
            <Head title="Zmiany" />

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
                                    <Tab label="Dodaj zmianę" />
                                    <Tab label="Zarządzaj zmianami" />
                                </Tabs>
                            </div>
                            <TabPanel value={tabValue} index={0}>
                                <AddShiftForm />
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <ManageTableShift />
                            </TabPanel>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
