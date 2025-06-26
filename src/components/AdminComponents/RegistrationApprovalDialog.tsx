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

interface RegistrationDialogProps {
  open: boolean;
  eventId: string | null;
  onClose: () => void;
}

export default function RegistrationDialog({ open, eventId, onClose }: RegistrationDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
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
      enqueueSnackbar("Registration approved successfully!", { variant: "success" });
      await refetchEventPendingRegistrations(eventId);
    } catch (err) {
      enqueueSnackbar(
        err instanceof Error ? err.message : "Failed to approve registration",
        { variant: "error" }
      );
    }
  };

  const handleReject = async (userId: string) => {
    if (!eventId) return;
    try {
      await rejectRegistration(eventId, userId);
      enqueueSnackbar("Registration rejected successfully!", { variant: "success" });
      await refetchEventPendingRegistrations(eventId);
    } catch (err) {
      enqueueSnackbar(
        err instanceof Error ? err.message : "Failed to reject registration",
        { variant: "error" }
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Pending Registrations</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="pending registrations table">
              <TableHead>
                <TableRow>
                  <TableCell>User Email</TableCell>
                  <TableCell>User Role</TableCell>
                  <TableCell>Event Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Channel</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
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
                      <Typography>No pending registrations for this event.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  eventPendingRegistrations.map((reg: Registration) => (
                    <TableRow key={`${reg.event_id}-${reg.user_id}`}>
                      <TableCell>{reg.user_email}</TableCell>
                      <TableCell>{reg.user_role}</TableCell>
                      <TableCell>{reg.event_title}</TableCell>
                      <TableCell>{reg.event_date.toLocaleDateString()}</TableCell>
                      <TableCell>{reg.event_channel}</TableCell>
                      <TableCell>{reg.event_language}</TableCell>
                      <TableCell>{reg.event_location}</TableCell>
                      <TableCell>{reg.status}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="approve"
                          color="success"
                          onClick={() => handleApprove(reg.user_id)}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          aria-label="reject"
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
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}