export default function Explorer() {
    return (
        <div className="inner">
            <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>BlockNum</th>
                                <th>PrevHash</th>
                                <th>BlockHash</th>
                                <th>CreatedAt</th>
                                <th>Network_Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {resultList()} */}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}