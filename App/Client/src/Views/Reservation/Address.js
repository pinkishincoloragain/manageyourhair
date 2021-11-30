import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";

export default function AddressForm(props) {

  const [self, setSelf] = useState(true);
  const [hairCutLabel, setHairCutLabel] = useState("I will get a haircut");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setFirstName(props.cutInfo[0]);
    setLastName(props.cutInfo[1]);
    setGender(props.cutInfo[2]);
    setDescription(props.cutInfo[3]);
  }, []);

  const handleChange = () => {
    props.setCutInfo([firstName, lastName, gender, description]);
  }

  const handleControl = () => {
    setSelf(!self);
    props.setSelf(!self)
    setHairCutLabel(!self ? "I will get a haircut." : "I am making reservation for someone else.");
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutter Bottom>
        User information
      </Typography>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch color="secondary" name="saveSelf" value="yes" defaultChecked={true} />
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
            placeholder={firstName}
            variant="standard"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); handleChange(); }}
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
            value={lastName}
            onChange={(e) => { setLastName(e.target.value); handleChange(); }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="gender"
            name="gender"
            label="Gender"
            fullWidth
            autoComplete="Gender"
            variant="standard"
            value={gender}
            onChange={(e) => { setGender(e.target.value); handleChange(); }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            name="description"
            label="description"
            fullWidth
            autoComplete="description"
            variant="standard"
            value={description}
            onChange={(e) => { setDescription(e.target.value); handleChange(); }}
          />
        </Grid>
      </Grid>}

    </React.Fragment>
  );
}
