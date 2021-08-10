import Promotion from "../components/Promotion";
import Purchase from "../components/Purchase";
import StoreList from "../components/StoreList";

export default function Home() {
    return (
        <div className="inner">
            <div className="index">
                <StoreList />
                <Promotion />
            </div>
        </div>
    );
}