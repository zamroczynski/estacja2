import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DarkTheme from "@/Themes/DarkTheme";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UserInformationSection from "./Partials/UserInformationSection";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function Edit({
    auth,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Mój profil
                </h2>
            }
        >
            <Head title="Mój profil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <ThemeProvider theme={DarkTheme}>
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <UserInformationSection
                                user={auth.user}
                                className="max-w-xl"
                            />
                        </div>
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </ThemeProvider>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
