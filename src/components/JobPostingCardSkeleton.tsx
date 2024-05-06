import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const JobPostingCardSkeleton = () => {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
        p: 2,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Skeleton variant="rectangular" width={65} height={65} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" width={100} />
          </Grid>
        </Grid>
        <Skeleton variant="text" width={150} />
        <Skeleton variant="text" width={"100%"} height={200} />
        <Skeleton variant="text" width={50} />
        <Skeleton variant="text" width={100} />
      </CardContent>
    </Card>
  );
};

export default JobPostingCardSkeleton;
