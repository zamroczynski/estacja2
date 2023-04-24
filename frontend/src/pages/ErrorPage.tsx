import { useRouteError } from "react-router-dom";
import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Card className="mx-auto mt-10" sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/images/404.jpg"
        title="Astronauta sam w kosmosie"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Ups...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Wygląda na to że aplikacja wybuchła i znalazła się w kosmosie...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Opis błędu: {error.statusText || error.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="/">
          Powrót
        </Button>
      </CardActions>
    </Card>
  );
}
