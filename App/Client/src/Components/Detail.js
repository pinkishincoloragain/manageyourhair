import { useEffect, useState } from "react";
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

    return (
        <div>
            <div className="fullPage" onClick={handleClose} />
            <div className="detail">
                <div>
                    <img src={props.card.image} alt={props.card.name} className="Image" />
                    <div style={{ flex: 1 }}>
                        <div className="detailHeader">
                            {props.card.name}
                        </div>
                        <div className="daysWrapper">
                            {props.hours}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}