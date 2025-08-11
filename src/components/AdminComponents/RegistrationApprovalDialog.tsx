import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import { useEvents } from "../../hooks/useEvents";
import { Registration } from "../../types";
import { RegistrationManagementRowSkeleton } from "./RegistrationManagementRowSkeleton";
import { useTranslation } from "react-i18next";

interface RegistrationDialogProps {
  open: boolean;
  eventId: string | null;
  onClose: () => void;
}

export default function RegistrationApprovalDialog({
  open,
  eventId,
  onClose,
}: RegistrationDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const {
    eventPendingRegistrations,
    isLoading,
    error,
    refetchEventPendingRegistrations,
    approveRegistration,
    rejectRegistration,
  } = useEvents();

  useEffect(() => {
    if (open && eventId) {
      refetchEventPendingRegistrations(eventId);
    }
  }, [open, eventId, refetchEventPendingRegistrations]);

  if (error) {
    enqueueSnackbar(error, { variant: "error" });
  }

  const handleApprove = async (userId: string) => {
    if (!eventId) return;
    try {
      await approveRegistration(eventId, userId);
      enqueueSnackbar(t("registrationDialog.approvedSuccess"), {
        variant: "success",
      });
      await refetchEventPendingRegistrations(eventId);
    } catch (err) {
      enqueueSnackbar(
        err instanceof Error
          ? err.message
          : t("registrationDialog.approveFail"),
        { variant: "error" }
      );
    }
  };

  const handleReject = async (userId: string) => {
    if (!eventId) return;
    try {
      await rejectRegistration(eventId, userId);
      enqueueSnackbar(t("registrationDialog.rejectedSuccess"), {
        variant: "success",
      });
      await refetchEventPendingRegistrations(eventId);
    } catch (err) {
      enqueueSnackbar(
        err instanceof Error ? err.message : t("registrationDialog.rejectFail"),
        { variant: "error" }
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{t("registrationDialog.title")}</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="pending registrations table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {t("registrationDialog.table.userEmail")}
                  </TableCell>
                  <TableCell>
                    {t("registrationDialog.table.userRole")}
                  </TableCell>
                  <TableCell>
                    {t("registrationDialog.table.eventTitle")}
                  </TableCell>
                  <TableCell>{t("registrationDialog.table.date")}</TableCell>
                  <TableCell>{t("registrationDialog.table.channel")}</TableCell>
                  <TableCell>
                    {t("registrationDialog.table.language")}
                  </TableCell>
                  <TableCell>
                    {t("registrationDialog.table.location")}
                  </TableCell>
                  <TableCell>{t("registrationDialog.table.status")}</TableCell>
                  <TableCell>{t("registrationDialog.table.actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <RegistrationManagementRowSkeleton key={index} />
                  ))
                ) : eventPendingRegistrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography>
                        {t("registrationDialog.noPending")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  eventPendingRegistrations.map((reg: Registration) => (
                    <TableRow key={`${reg.event_id}-${reg.user_id}`}>
                      <TableCell>{reg.user_email}</TableCell>
                      <TableCell>{reg.user_role}</TableCell>
                      <TableCell>{reg.event_title}</TableCell>
                      <TableCell>
                        {reg.event_date.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{reg.event_channel}</TableCell>
                      <TableCell>{reg.event_language}</TableCell>
                      <TableCell>{reg.event_location}</TableCell>
                      <TableCell>{reg.status}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label={t("common.approved")}
                          color="success"
                          onClick={() => handleApprove(reg.user_id)}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          aria-label={t("common.reject")}
                          color="error"
                          onClick={() => handleReject(reg.user_id)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={onClose}>
              {t("common.close")}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
