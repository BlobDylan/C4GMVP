import { TableCell, TableRow, Skeleton } from "@mui/material";

function UpcomingEventRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="text" width="80%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="60%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="60%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="60%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="60%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="60%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="60%" />
      </TableCell>
    </TableRow>
  );
}
export default UpcomingEventRowSkeleton;
