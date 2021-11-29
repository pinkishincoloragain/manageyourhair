import Star from "assets/star.png"
// import Star from "assets/Star.png"

export default function Stars(props) {

    // let whichScore = 
    const score = props.score;
    const items = []
    let i = 0;
    for (i = 0; i <= score - 1; i++) {
        items.push(<img src={Star} alt="star"
            style={{ width: "1vw" }}
            key={props.contact + i.toString()} />)
    }
    items.push(<img src={Star} alt="star"
        style={{
            objectFit: "cover", width: `${score - (Math.floor(score))}vw`
        }}
        key={props.contact + i.toString()} />)

    return (
        <div>
            {items}
        </div>
    )
}