import React from "react";
import { Link } from "react-router-dom";

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/getAllInfo", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) =>
                this.setState({
                    data: jsonData
                }));
        // console.log(jsonData));
    }

    render() {
        const { data } = this.state;
        const resultList = () => {
            const result = [];
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i].Record);
                // if(data[i].Key.indexOf("TxLog")===0){
                //     continue;
                // }
                result.push(
                    <tr key={i}>
                        <td>
                            <div className="data">
                                <Link to={`/getTransaction/${data[i].Key}`}>{data[i].Key}</Link>
                            </div>
                        </td>
                        <td>
                            <div className="data">
                                {data[i].Record.coin}
                            </div>

                        </td>
                    </tr>
                )
            }
            return result;
        }
        return (
            <div className="inner">
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>Coin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserList;