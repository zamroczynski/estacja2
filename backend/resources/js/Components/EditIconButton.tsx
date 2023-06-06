import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type EditIconButtonProps = {
    onClick: () => void;
};

const EditIconButton: React.FC<EditIconButtonProps> = ({ onClick }) => {
    return (
        <Tooltip title="Edytuj">
            <IconButton onClick={onClick}>
                <EditIcon color="warning" />
            </IconButton>
        </Tooltip>
    );
};

export default EditIconButton;
