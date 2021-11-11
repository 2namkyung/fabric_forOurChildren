import Promotion from "../components/Promotion";
import StoreList from "../components/StoreList";
import StoreListStateProvider from "../providers/StoreListStateProvider";

export default function Home() {
    return (
        <div className="inner">
            <div className="index">
                <StoreListStateProvider>
                    <StoreList />
                </StoreListStateProvider>
                <Promotion />
            </div>
        </div>
    );
}