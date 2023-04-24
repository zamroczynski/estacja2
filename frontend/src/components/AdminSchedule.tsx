import React from "react";
import { Box } from "@mui/system";
import { AdminScheduleButton, DialogListPreferences } from ".";
import {
  FormatListNumbered,
  AddBox,
  EventNote,
  Build,
} from "@mui/icons-material";
import { Color } from "./Types";
import { rowsPreferences } from "../pages/data/preferences";

const AdminSchedule = () => {
  const [preferencesDialog, setPreferencesDialog] = React.useState(false);
  const [addScheduleDialog, setAddScheduleDialog] = React.useState(false);
  const [manageSchedulesDialog, setManageSchedulesDialog] =
    React.useState(false);
  const [configureShiftDialog, setConfigureShiftDialog] = React.useState(false);

  const handleClickPreferencesDialogOpen = () => {
    setPreferencesDialog(true);
  };
  const handleClickPreferencesDialogClose = () => {
    setPreferencesDialog(false);
  };

  const handleClickAddScheduleDialogOpen = () => {
    setAddScheduleDialog(true);
  };
  const handleClickAddScheduleDialogClose = () => {
    setAddScheduleDialog(false);
  };

  const handleClickManageSchedulesDialogOpen = () => {
    setManageSchedulesDialog(true);
  };
  const handleClickManageSchedulesDialogClose = () => {
    setManageSchedulesDialog(false);
  };

  const handleClickConfigureShiftDialogOpen = () => {
    setConfigureShiftDialog(true);
  };
  const handleClickConfigureShiftDialogClose = () => {
    setConfigureShiftDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <AdminScheduleButton
        onClick={handleClickPreferencesDialogOpen}
        icon={<FormatListNumbered fontSize="large" sx={{ mr: 1 }} />}
        color={Color.Info}
        label="Preferencje"
      />
      <AdminScheduleButton
        onClick={handleClickAddScheduleDialogOpen}
        icon={<AddBox fontSize="large" sx={{ mr: 1 }} />}
        color={Color.Success}
        label="Utwórz nowy grafik"
      />
      <AdminScheduleButton
        onClick={handleClickManageSchedulesDialogOpen}
        icon={<EventNote fontSize="large" sx={{ mr: 1 }} />}
        color={Color.Warning}
        label="Zarządzaj grafikami"
      />
      <AdminScheduleButton
        onClick={handleClickConfigureShiftDialogOpen}
        icon={<Build fontSize="large" sx={{ mr: 1 }} />}
        color={Color.Primary}
        label="Edytuj zmiany"
      />
      <DialogListPreferences
        open={preferencesDialog}
        handleClose={handleClickPreferencesDialogClose}
        rows={rowsPreferences}
      />
    </Box>
  );
};

export default AdminSchedule;
