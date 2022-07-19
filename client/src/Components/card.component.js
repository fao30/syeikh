import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

export default function BasicCard({ data }) {
  const Navigate = useNavigate();

  console.log("INI DATA==>>", data);
  return (
    <Card sx={{ minWidth: 100, width: 500 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          REFERENCE VISIT
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          VISIT FROM NUMBER {data.visitReferenceFkId.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            Navigate(`/visit/${data.visitReferenceFkId.id}`);
          }}
          size="small"
        >
          OPEN REFERENCE VISIT
        </Button>
      </CardActions>
    </Card>
  );
}
