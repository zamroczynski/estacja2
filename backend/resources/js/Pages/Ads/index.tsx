import * as React from "react";
import { Head } from "@inertiajs/react";
import {
    ThemeProvider,
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
    Switch,
} from "@mui/material";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DarkTheme from "@/Themes/DarkTheme";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import adsProps from "@/types/adsProps";
import http from "@/http";

export default function index({ auth }: PageProps) {
    const [ads, setAds] = React.useState<adsProps[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const getAds = async (url: string = "/ads/active") => {
        await http.get(url).then((response) => {
            setLoading(false);
            setAds(response.data.ads);
        });
        setLoading(false);
    };

    React.useEffect(() => {
        setTimeout(() => {
            getAds();
        }, 1);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Ogłoszenia
                </h2>
            }
        >
            <Head title="Ogłoszenia" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg dark:text-white">
                        <ThemeProvider theme={DarkTheme}>
                            <Switch label="Pokaż archiwalne" />
                            <div className="flex flex-wrap">
                                {loading && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                )}
                                {ads?.map((row) => (
                                    <Card
                                        sx={{
                                            minWidth: "30.0rem",
                                            margin: "1.0rem",
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                sx={{ fontSize: 14 }}
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                Ważne do
                                                {dayjs(row.valid_until).format(
                                                    " DD/MM/YYYY"
                                                )}
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                            >
                                                {row.title}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    mb: 1.5,
                                                    fontSize: 12,
                                                }}
                                                color="text.secondary"
                                            >
                                                Priorytet: {row.prority.name}
                                            </Typography>
                                            <Typography>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: row.description,
                                                    }}
                                                ></div>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
