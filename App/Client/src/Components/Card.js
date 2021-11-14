export default function Card(props) {
  return (
    <div className="CardWrapper">
      <div className="Card">
        <img src={props.image} alt={props.name} className="CardImage" />
        <div className="CardPara">
          <div className="CardTitle">{props.name}</div>
          <div className="CardContact">{props.contact}</div>
          <div>

          </div>
          <div className="CardScore">{props.score}</div>
          <div className="CardOpenHour">{props.open_hour}</div>
          <div className="CardDist">{props.dist}</div>
        </div>
      </div>
    </div>
  );
}
