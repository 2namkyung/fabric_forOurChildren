import React from 'react';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/" + window.location.pathname, {
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
                console.log(data[i].Value);
                const obj = JSON.parse(data[i].Value);
                result.push(
                    <tr key={i}>
                        <td>
                            {i+1}
                        </td>
                        <td>
                            {obj.name}
                        </td>
                        <td>
                            {obj.coin}
                        </td>
                        <td>
                            {obj.time}
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
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <td className="tx">Tx</td>
                                <td className="name">Name</td>
                                <td>Coin</td>
                                <td>Time</td>
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


export default Transaction;