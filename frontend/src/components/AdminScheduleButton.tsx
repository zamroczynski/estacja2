import React from "react";
import { Fab } from "@mui/material";
import { Color } from "./Types";

type ScheduleButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  color: Color;
  label: string;
};

const AdminScheduleButton: React.FC<ScheduleButtonProps> = ({
  onClick,
  icon,
  color,
  label,
}) => {
  return (
    <Fab
      component="button"
      size="large"
      variant="extended"
      color={color}
      sx={{ m: 1 }}
      onClick={onClick}
    >
      {icon}
      {label}
    </Fab>
  );
};

export default AdminScheduleButton;
