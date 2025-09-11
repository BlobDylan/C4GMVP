import { Box, Skeleton } from "@mui/material";

function EventBoardCardSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80%",
        alignContent: "center",
        justifyContent: "space-between",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Skeleton variant="text" width="60%" height={60} />
      <Skeleton variant="text" width="100%" height={30} />
      <Skeleton variant="text" width="80%" height={30} />
      <Skeleton variant="text" width="50%" height={30} />
      <Skeleton variant="text" width="70%" height={30} />
      <Skeleton variant="text" width="40%" height={30} />
      <Skeleton variant="rectangular" width="100%" height={50} />
    </Box>
  );
}

export default EventBoardCardSkeleton;
