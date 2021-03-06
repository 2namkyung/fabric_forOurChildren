import useStoreLists from "../hooks/useStoreLists"

import AddCircleIcon from '@material-ui/icons/AddCircle';
import useActions from "../hooks/useActions";
import Purchase from "./Purchase";

export default function StoreList() {
    const storeLists = useStoreLists();
    const { addToOrder } = useActions();
    return (
        <>
            <div className="StoreList">
                <span className="list__header">Store List For Our Children</span>
                {storeLists.map(store => {
                    const { id, title, price, desc } = store;

                    const click = () => {
                        addToOrder(id);
                    }
                    return (
                        <div className="item" key={id}>
                            <img src="/img/gopher.png" alt="store1" />
                            <div className="desc">{desc}</div>
                            <div className="input">
                                <h3>{title} , ${price}</h3>
                                <AddCircleIcon onClick={click} className="plus" />
                            </div>
                        </div>
                    )
                })}
                <Purchase />
            </div>
        </>

    )
}