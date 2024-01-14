import { useState, useEffect } from "react";
import List from "./components/List";

function App() {
  const [data, setData] = useState<{ taskName: string; status: string }[]>([]);
  let heading = "ToDo List";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_BACKEND_API_URL
        );
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [isSaved, setIsSaved] = useState(false);

  const Save = async () => {
    const dataToSend = { items: [...data] };
    const stringifyData = JSON.stringify(dataToSend);
    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_BACKEND_API_URL,
        {
          method: "POST",
          body: stringifyData,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        console.log("ok");
        setIsSaved(true);

        // Clear the "saved" message after a certain duration (e.g., 2 seconds)
        setTimeout(() => {
          setIsSaved(false);
        }, 500); // Handle successful save (e.g., update UI, clear pending changes)
      }
    } catch (error) {
      console.log(error);
    }
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
