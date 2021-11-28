import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Reservation from "assets/Reservation.jpeg"
import Details from "assets/Details.jpeg"
import Review from "assets/Review.png"

import "styles/Detail.scss"

export default function Detail(props) {

    useEffect(() => {
        console.log(props);
    }, []);

    let clickVal = true;
    const [click, setClick] = useState(clickVal);
    useEffect(() => {
        clickVal = false;
    });

    const handleClose = () => {
        setClick(true);
        props.callback(false);
    }

    const handleReserve = () => {
    }

    const handleDetail = () => {
    }

    return (
        <div>
            <div className="fullPage" onClick={handleClose} />
            <div>
                <div className="nameLabel">
                    {props.card.name}
                </div>
                <div className="detail">
                    <img src={props.card.image} alt={props.card.name} className="Image" />
                    <div>
                        <div className="detailHeader">
                        </div>
                        <div className="daysWrapper">
                            {props.hours.length > 10 ? null : props.hours}
                        </div>
                        <div className="CardButtons" onClick={() => handleReserve()}>


                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <div className="btnHolder">
                        <Link to={`./reservation/${props.card.shop_id}/${props.card.name.toString()}`} className="Link" style={{ textDecoration: "none", color: "black" }}>
                            <img src={Reservation} style={{ width: "4vw" }} className="icnBtn" />
                        </Link>
                        <div>Reservation</div>

                    </div>
                    <div className="btnHolder">
                        <Link to={`./review/${props.card.shop_id}/${props.card.name.toString()}`} className="Link" style={{ textDecoration: "none", color: "black" }}>
                            <img src={Review} style={{ width: "4vw" }} className="icnBtn" />
                        </Link>
                        <div>Review</div>
                    </div>
                    {/* <div className="btnHolder">
                        <a href={props.card.website}>
                            <img src={Review} style={{ width: "4vw" }} className="icnBtn" />
                        </a>
                        <div>Review</div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}