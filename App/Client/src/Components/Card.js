import { useState } from 'react';
import Stars from "./Stars";
import Reservation from "assets/Reservation.jpeg"
import Details from "assets/Details.jpeg"
import Review from "assets/Review.png"
import { Link } from 'react-router-dom';

export default function Card(props) {

  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [detailClick, setDetailClicked] = useState(false);
  const [reviewClick, setReviewClicked] = useState(false);

  const [detailed, setDetailed] = useState(false);

  const handleReserve = () => {

  }
  const handleDetail = () => {
    setDetailed(!detailed);
  }

  const handleWebsite = () => {
    if (props.website != null)
      window.open("https://" + props.website, '_blank');
  }

  let tel = props.contact;
  let telLink = "tel:" + tel;

  return (
    <div className="CardWrapper">
      <div className="Card"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        style={{ width: "500px" }}>
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
            {props.contact == 'None' ? null : <a href={telLink}>
              <div className="CardContact">{props.contact}</div>
            </a>}

            {/* <div className="CardOpenHour">{props.open_hour}</div> */}
            {/* <div className="CardDist">{props.dist}</div> */}
          </div>
          <div className="CardButtons" onClick={() => handleReserve()}>
            {detailed ? null : <Link to={`./reservation/${props.shop_id}/${props.name.toString()}`} className="Reserve" style={{ textDecoration: "none", color: "black" }}>
              <div className="Reserve">
                <img src={Reservation} style={{ width: "2.3vw" }} className="icnBtn" />
                {hover ? "Reservation" : null}
              </div>
            </Link>}

            <div className="Detail" onClick={() => handleDetail()}>
              <img src={Details} style={{ width: "2.3vw" }} className="icnBtn" />
              {hover ? "Detail" : null}
              {detailed ? <div className="DetailPage"></div> : null}
            </div>

            {detailed ? null : <div className="Review">
              <img src={Review} style={{ width: "2.3vw" }} className="icnBtn" />
              {hover ? "Review" : null}
            </div>
            }
          </div>
        </div>
      </div>
    </ div>
  );
}


// function Buttons(props) {


//   return (
//     <div className="CardButtons" onClick={() => handleReserve()}>
//       {detailed ? null : <Link to={"./reservation"} className="Reserve">
//         <div className="Reserve">
//           <img src={Reservation} style={{ width: "2.3vw" }} className="icnBtn" />
//           {props.hover ? "Reservation" : null}
//         </div>
//       </Link>}

//       <div className="Detail" onClick={() => handleDetail()}>
//         <img src={Details} style={{ width: "2.3vw" }} className="icnBtn" />
//         {props.hover ? "Detail" : null}
//         {detailed ? <div className="DetailPage"></div> : null}
//       </div>

//       {detailed ? null : <div className="Review">
//         <img src={Review} style={{ width: "2.3vw" }} className="icnBtn" />
//         {props.hover ? "Review" : null}
//       </div>
//       }
//     </div>
//   );
// }
