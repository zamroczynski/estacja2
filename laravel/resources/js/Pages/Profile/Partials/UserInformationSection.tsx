import { usePage } from "@inertiajs/react";
import { TextField, Typography } from "@mui/material";
import { User } from "@/types";
import dayjs from "dayjs";

export default function UserInformationSection({
    className = "",
    user,
}: {
    className?: string;
    user: User;
}) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Twoje dane
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Tutaj znajdziesz informację o Twoim koncie.
                </p>
            </header>

            <div className="mt-5">
                <Typography color={"white"}>Imię i nazwisko: </Typography>
                <TextField
                    value={user.name}
                    name="imię"
                    disabled
                    variant="standard"
                    fullWidth
                />
            </div>

            <div className="mt-2">
                <Typography color={"white"}>Rola w systemie: </Typography>
                <TextField
                    value={user.role}
                    name="imię"
                    disabled
                    variant="standard"
                    fullWidth
                />
            </div>

            <div className="mt-2">
                <Typography color={"white"}>Email: </Typography>
                <TextField
                    value={user.email}
                    name="imię"
                    disabled
                    variant="standard"
                    fullWidth
                />
            </div>

            <div className="mt-2">
                <Typography color={"white"}>Data założenia konta: </Typography>
                <TextField
                    value={dayjs(user.created_at).format("DD/MM/YYYY")}
                    name="imię"
                    disabled
                    variant="standard"
                    fullWidth
                />
            </div>
        </section>
    );
}
