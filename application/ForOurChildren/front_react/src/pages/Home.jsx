import Promotion from "../components/Promotion";
import StoreList from "../components/StoreList";

export default function Home() {
    return (
        <div className="inner">
            <div className="index">
                <span>Store List For Our Children</span>
                <StoreList/>
                <Promotion/>
            </div>
        </div>
    );
}