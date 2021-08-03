import React from "react";
import { Link } from "react-router-dom";

class Index extends React.Component {

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
        const data = this.state.data;
        const resultList = () => {
            const result = [];
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].Record);
                result.push(
                    <tr key={i}>
                        <td>
                            <Link to={`/getTransaction/${data[i].Key}`}>{data[i].Key}</Link>
                        </td>
                        <td>
                            {data[i].Record.coin}
                        </td>
                    </tr>
                )
            }
            return result;
        }
        return (
            <div>
                <div className="title">
                    <h1>For Our Children</h1>
                    <a href="/getTransaction/all">Transaction</a>
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>Coin</th>
                            </tr>
                        </thead>
                        <tbody id="table_content">
                            {resultList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Index;