import { Switch, Route} from 'react-router-dom';
import Blocks from '../components/block/Blocks';
import Chaincode from '../components/block/Chaincode';
import ExplorerNav from '../components/block/ExplorerNav';
import Tx from '../components/block/Tx';
import Channel from '../components/block/Channel';

export default function Explorer() {
    return (
        <div className="inner">
            <ExplorerNav />
            <div className="explorer">
                <Switch>
                    <Route exact path="/explorer/chaincode" component={Chaincode} exact/>
                    <Route exact path="/explorer/blocks" component={Blocks} exact/>
                    <Route exact path="/explorer/network" component={Channel} exact/>
                    <Route exact path="/explorer/txs" component={Tx} exact/>
                </Switch>
            </div>
        </div>
    )
}