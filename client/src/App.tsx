import "./App.css";

import { useState, useEffect } from "react";

function App() {
  const [facts, setFacts] = useState<{ info: string; source: string }[]>([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:3000/events");

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        setFacts((facts) => facts.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, facts]);

  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Fact</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {facts.map((fact, i) => (
          <tr key={i}>
            <td>{fact.info}</td>
            <td>{fact.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
