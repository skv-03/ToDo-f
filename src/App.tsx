import { useState, useEffect } from "react";
import List from "./components/List";

function App() {
  const [data, setData] = useState<{ taskName: string; status: string }[]>([]);
  let heading = "ToDo List";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api");
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log("failed");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     Save();
  //   }, 30000);

  //   // Cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []); // Empty dependency array to run the effect only once on mount
  const [isSaved, setIsSaved] = useState(false);
  const Save = async () => {
    const dataToSend = { items: [...data] }; // Wrap the array in an object with the "items" property
    const stringifyData = JSON.stringify(dataToSend);
    try {
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: stringifyData,
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("ok");
        setIsSaved(true);

        // Clear the "saved" message after a certain duration (e.g., 2 seconds)
        setTimeout(() => {
          setIsSaved(false);
        }, 500); // Handle successful save (e.g., update UI, clear pending changes)
      }
    } catch (error) {}
  };
  const manualSave = async () => {
    Save();
  };

  return (
    <div>
      <br />
      <br />
      <br />

      <List
        heading={heading}
        manualSave={manualSave}
        data={data}
        setData={setData}
      />
      {isSaved && <div className="saved-message">Saved</div>}
    </div>
  );
}

export default App;
