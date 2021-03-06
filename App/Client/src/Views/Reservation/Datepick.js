import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import DateTimePicker from '@mui/lab/DateTimePicker';


export default function DatePick(props) {

  const [value, setValue] = useState(new Date());

  const checkValue = (newValue) => {
    let temp = new Date(newValue);
    let hours = temp.getHours();

    if (hours < 9 || hours > 20) {

      alert("Sorry, we are not open at this time.");
      props.setTimeChecked(false);
      return false;
    }
    else {
      alert("Time confirmed");
      return true;
    }

  }

  useEffect(() => {
    if (props.reservationTime != null)
      setValue(props.reservationTime);
  }
    , [props.reservationTime]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation date
      </Typography>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          value={value}

          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDate={new Date()}
        />
        <Button variant="contained"

          color="primary"
          onClick={() => {
            console.log(value);

            if (checkValue(value)) {
              setValue(value);
              props.setReservationTime(value);
              props.setTimeChecked(true);
              console.log(props.reservationTime);
            }
          }} >
          Confirm
        </Button>
      </div>
    </React.Fragment>
  );
}
