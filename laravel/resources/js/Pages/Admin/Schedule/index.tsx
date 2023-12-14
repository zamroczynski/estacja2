import * as React from "react";
import { Head, Link } from "@inertiajs/react";
import { ThemeProvider, IconButton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { MenuCard } from "./Partials";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DarkTheme from "@/Themes/DarkTheme";

import { CalendarViewMonth, CalendarMonth } from "@mui/icons-material";

export default function index({ auth }: PageProps<{ expiryDates: any }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Grafik Menu
                    </h2>
                    <Link href={route("admin")}>
                        <IconButton>
                            <ArrowBackIcon className="text-xl text-gray-800 dark:text-gray-200 leading-tight" />
                        </IconButton>
                    </Link>
                </div>
            }
        >
            <Head title="Grafik Menu" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg dark:text-white">
                        <ThemeProvider theme={DarkTheme}>
                            <Stack
                                direction="row"
                                useFlexGap
                                flexWrap="wrap"
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Link href={route("admin.schedule")}>
                                    <MenuCard
                                        Icon={CalendarMonth}
                                        ButtonText="Grafik"
                                    />
                                </Link>
                                <Link href={route("admin.shift")}>
                                    <MenuCard
                                        Icon={CalendarViewMonth}
                                        ButtonText="Zmiany"
                                    />
                                </Link>
                            </Stack>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
