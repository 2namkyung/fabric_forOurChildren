export default function Chaincode(){
    return (
        <table>
        <thead>
            <tr>
                <th className="cc__num">Num</th>
                <th>Name</th>
                <th>Network</th>
            </tr>
        </thead>
        <tbody>
            {/* {results.map((result) => (
                <tr key={result.block_number}>
                    <td >
                        {result.block_number}
                    </td>
                    <td className="preHash">
                        {result.prevblock_hash}
                    </td>
                    <td className="blockHash">
                        {result.block_hash}
                    </td>
                    <td>
                        {result.created_at}
                    </td>
                    <td>
                        {result.network_name}
                    </td>
                </tr>
            ))} */}
        </tbody>
    </table>
    )
}