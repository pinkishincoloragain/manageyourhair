import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Switch } from "@mui/material";


export default function PaymentForm() {

  const [self, setSelf] = useState(true);
  const [hairCutLabel, setHairCutLabel] = useState("I will pay on the spot.");
  const [date, changeDate] = useState(new Date());

  const handleControl = () => {
    setSelf(!self);
    setHairCutLabel(!self ? "I will pay on the spot." : "I will pay online with card.");
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation date
      </Typography>

    </React.Fragment>
  );
}
