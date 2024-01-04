export default function Log({ logData }) {
    return (
        <ol id="log">
            {logData.map(log => {
                return (
                  <li key={`${log.square.row},${log.square.column}`}>
                    {log.player} selected {log.square.row},{log.square.column}
                  </li>
                );
            })}
        </ol>
    )
}

