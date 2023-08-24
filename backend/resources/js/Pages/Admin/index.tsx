import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { ThemeProvider, Stack } from "@mui/material";
import {
    People,
    Newspaper,
    CalendarViewMonth,
    Task,
    CalendarMonth,
} from "@mui/icons-material";

import { MenuCard } from "./Partials";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DarkTheme from "@/Themes/DarkTheme";

export default function index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Panel administracyjny
                </h2>
            }
        >
            <Head title="Panel administracyjny" />

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
                                <Link href={route("admin.user")}>
                                    <MenuCard
                                        Icon={People}
                                        ButtonText="Pracownicy"
                                    />
                                </Link>
                                <Link href={route("admin.ads")}>
                                    <MenuCard
                                        Icon={Newspaper}
                                        ButtonText="Ogłoszenia"
                                    />
                                </Link>
                                <Link href={route("admin.planogram")}>
                                    <MenuCard
                                        Icon={CalendarViewMonth}
                                        ButtonText="Planogramy"
                                    />
                                </Link>
                                <MenuCard Icon={Task} ButtonText="Zadania" />
                                <MenuCard
                                    Icon={CalendarMonth}
                                    ButtonText="Grafik"
                                />
                            </Stack>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
