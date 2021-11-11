import Awards from "./Awards"
import Notice from "./Notice"

export default function Promotion() {

    return (
        <div className="inner">
            <div className="promotion">
                <Notice/>
                <Awards/>
            </div>
        </div>

    );
}