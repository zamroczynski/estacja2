import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type EditIconButtonProps = {
    onClick: () => void;
    value: boolean;
};

const CheckCircleIconButton: React.FC<EditIconButtonProps> = ({
    onClick,
    value,
}) => {
    return (
        <span>
            {value ? (
                <Tooltip title="Anuluj">
                    <IconButton onClick={onClick}>
                        <CheckCircleIcon color="primary" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Akceptuj">
                    <IconButton onClick={onClick}>
                        <CheckCircleIcon />
                    </IconButton>
                </Tooltip>
            )}
        </span>
    );
};

export default CheckCircleIconButton;
