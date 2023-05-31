import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function index({
    auth,
}: PageProps<{ products: Array<string> }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Mój profil
                </h2>
            }
        >
            <Head title="Terminy" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        Terminy
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
