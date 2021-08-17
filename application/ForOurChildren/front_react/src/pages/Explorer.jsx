import { Switch, Route} from 'react-router-dom';
import Blocks from '../components/block/Blocks';
import Chaincode from '../components/block/Chaincode';
import ExplorerNav from '../components/block/ExplorerNav';
import Network from '../components/block/Network';
import Tx from '../components/block/Tx';

export default function Explorer() {
    return (
        <div className="inner">
            <ExplorerNav />
            <div className="explorer">
                <Switch>
                    <Route exact path="/explorer/chaincode" component={Chaincode} />
                    <Route exact path="/explorer/blocks" component={Blocks} />
                    <Route exact path="/explorer/network" component={Network} />
                    <Route exact path="/explorer/txs" component={Tx} />
                </Switch>
            </div>
        </div>
    )
}