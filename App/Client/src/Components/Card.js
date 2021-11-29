import { useState, useRef } from 'react';
import Stars from "./Stars";
import Reservation from "assets/Reservation.jpeg"
import Details from "assets/Details.jpeg"
import Review from "assets/Review.png"
import { Link } from 'react-router-dom';
import Detail from './Detail';

export default function Card(props) {

  let tel = props.contact;
  let telLink = "tel:" + tel;
  let detailFlag = true;

  // const open_hour = props.open_hour;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [reviewClick, setReviewClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const [detailed, setDetailed] = useState(false);

  const cardStyle = useRef();

  const convertHours = () => {
    let sep_hours;
    let i = 0;
    let open_hours = props.open_hour.replace('[', '').replace(']', '').split(',');
    if (open_hours.length == 7) {
      sep_hours = Array.from(open_hours, x => x.replaceAll("'", "").replaceAll('"', "").replaceAll(' ', "").replaceAll('.', ''));

      let current_day = new Date().getDay() + 1;
      let current_time = new Date().getHours();
      console.log("today", days[current_day])

      for (let i = 0; i < sep_hours.length; i++) {
        sep_hours[i] = days[i] + ": " + sep_hours[i].toUpperCase();
        if (i == current_day && sep_hours[i] != days[i] + ": CLOSED") {
          // sep_hours[i].replace("") 
          let start_time, end_time;
          if (sep_hours[i].includes("AM")) {
            start_time = sep_hours[i].slice(sep_hours[i].indexOf(" "), sep_hours[i].indexOf("AM"));
            console.log("start_time", start_time.trim());
          }
          if (sep_hours[i].includes("PM")) {
            end_time = sep_hours[i].slice(sep_hours[i].indexOf("-"), sep_hours[i].indexOf("PM"));
            end_time = end_time + 12;
            console.log("end_time", end_time.trim());
          }
          else {
            // Open 24 hours
            setOpen(true);
          }
        }
      }
      sep_hours[7] = sep_hours[0];
      sep_hours.splice(0, 1);
      console.log("open", open);

    }

    else {
      detailFlag = false;
    }
    return (<div className="days">
      {sep_hours.map((hour, index) => {
        return (<div key={index} className="dayDiv">{hour}</div>)
      }
      )}
    </div>);
  }

  const handleReserve = () => {
  }

  const handleDetail = () => {
    console.log(props.open_hour);
    let hours;

    if (props.open_hour.length > 10) {
      hours = convertHours();
    }

    else {
      return null;
    }

    setDetailed(!detailed);
  }

  const handleWebsite = () => {
    if (props.website != null)
      window.open("https://" + props.website, '_blank');
  }


  return (
    <>{detailed ?
      <Detail
        hours={convertHours()}
        callback={setDetailed}
        // name={props.name} 
        card={props}
      />
      :
      <div className="CardWrapper"
        ref={cardStyle}
      >

        <div className="Card"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <img src={props.image} alt={props.name} className="CardImage"
          />
          <div className="CardPara">
            <div className="CardTitle"
              onClick={() => handleWebsite()}
            >{props.name}</div>
            <div className="CardStars">
              <Stars score={props.score} /> &nbsp;({props.score}/5)
            </div>
            <div className="CardDescription">
              <div className="CardAddress">{props.address}</div>
              <div className="CardDist">Approximately {props.dist / 1000} km</div>
              {props.contact == 'None' ? null : <a href={telLink}>
                <div className="CardContact">{props.contact}</div>
              </a>}

            </div>
            <div className="CardButtons" onClick={() => handleReserve()}>
              {detailed ? null :
                <Link to={`../reservation/${props.shop_id}/${props.name.toString()}`} className="Reserve" style={{ textDecoration: "none", color: "black" }}>
                  <div className="Reserve">
                    <img src={Reservation} style={{ width: "2.3vw" }} className="icnBtn" />
                    {hover ? "Reservation" : null}
                  </div>
                </Link>
              }

              <div className="Detail" onClick={() => handleDetail()}>
                <img src={Details} style={{ width: "2.3vw" }} className="icnBtn" />
                {hover ? "Detail" : null}
                {detailed ? <div className="CardOpenHour">{props.open_hour}</div>
                  : null}
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </ div>
    }
    </>
  );
}