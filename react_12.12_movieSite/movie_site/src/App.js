import React, { useState, useEffect } from "react";
import Navi from "./Navi";

function App() {
  const [kategoriler, setKategoriler] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/kategoriler")
      .then((response) => response.json())
      .then((data) => setKategoriler(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <Navi />
    </div>
  );
}

export default App;
