import React from 'react';

class TransactionAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/transactionLogAll", {
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
                    result.push(
                        <tr key={i}>
                            <td>
                                {data[i].Key}
                            </td>
                            <td>
                                {data[i].TransactionLog.receiver}
                            </td>
                            <td>
                                {data[i].TransactionLog.amount}
                            </td>
                            <td>
                                {data[i].TransactionLog.sender}
                            </td>
                            <td>
                                {data[i].TransactionLog.time}
                            </td>
                        </tr>
                    )
            }
            return result;
        }
        return (
            <div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>Tx</th>
                                <th>받은 사람</th>
                                <th>보낸 금액</th>
                                <th>보낸 사람</th>
                                <th>Time</th>
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


export default TransactionAll;