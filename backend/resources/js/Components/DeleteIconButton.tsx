import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type EditIconButtonProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DeleteIconButton: React.FC<EditIconButtonProps> = ({ onClick }) => {
    return (
        <Tooltip title="Usuń">
            <IconButton onClick={onClick}>
                <DeleteIcon color="error" />
            </IconButton>
        </Tooltip>
    );
};

export default DeleteIconButton;
