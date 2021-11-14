import Stars from "./Stars";

export default function Card(props) {
  return (
    <div className="CardWrapper">
      <div className="Card">
        <img src={props.image} alt={props.name} className="CardImage" />
        <div className="CardPara">
          <div className="CardTitle">{props.name}</div>
          <div className="CardStars">
            <Stars score={props.score} /> &nbsp;({props.score} / 5.0)
          </div>
          <div className="CardDescription">
            <div className="CardAddress">{props.address}</div>
            <div className="CardContact">{props.contact}</div>
            {/* <div className="CardDist">{props.dist}</div> */}
          </div>
          {/* <div className="CardOpenHour">{props.open_hour}</div> */}

        </div>
      </div>
    </div>
  );
}
