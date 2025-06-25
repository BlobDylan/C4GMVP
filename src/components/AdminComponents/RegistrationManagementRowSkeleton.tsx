import { TableRow, TableCell, Skeleton } from "@mui/material";

export function RegistrationManagementRowSkeleton() {
  return (
    <TableRow>
      {Array.from({ length: 9 }).map((_, index) => (
        <TableCell key={index}>
          <Skeleton variant="text" height={20} />
        </TableCell>
      ))}
    </TableRow>
  );
}