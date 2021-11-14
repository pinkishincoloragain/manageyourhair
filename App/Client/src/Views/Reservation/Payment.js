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

  const handleControl = () => {
    setSelf(!self);
    setHairCutLabel(!self ? "I will pay on the spot." : "I will pay online with card.");
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment details
      </Typography>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch color="secondary" name="saveSelf" value="yes" defaultChecked="no" />
          }
          onClick={() => { handleControl(); }}
          label={hairCutLabel}
        />
      </Grid>

      {self ? null : <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="CVC number"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>

      </Grid>}

    </React.Fragment>
  );
}
