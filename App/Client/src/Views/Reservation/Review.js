import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";


export default function Review(props) {
  console.log(props.reservarionTime);
  let products = [
    {
      name: props.shop_name,
      desc: props.reservationTime.toDateString(),
      price: "Pay at the place",
    }
  ];

  let payments = [
    { name: "First name", detail: "user" },
    { name: "Last name", detail: "user" },
    // { name: "description", detail: "desc"},
    // { name: "gender", detail: "gender" },
  ];

  if (!props.selfCut) {
    payments = [
      { name: "First name", detail: props.cutInfo[0] },
      { name: "Last name", detail: props.cutInfo[1] },
      { name: "description", detail: props.cutInfo[2] },
      { name: "gender", detail: props.cutInfo[3] },
    ];
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Reservation details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
