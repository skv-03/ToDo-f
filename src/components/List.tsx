import ListItem from "./ListItem";
interface ListProps {
  heading: string;
  manualSave: () => void;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const List = ({ heading, manualSave, data, setData }: ListProps) => {
  const handleAddItem = () => {
    let updatedItems = [...data];
    updatedItems.push({ taskName: "Add a new Task", status: "Select" });
    setData(updatedItems);
  };
  const handleDelete = (index: number) => {
    let updatedItems = [...data];
    updatedItems.splice(index, 1);
    setData(updatedItems);
  };
  const handleStatusChange = (index: number, newStatus: string) => {
    let updatedItems = [...data];
    updatedItems[index].status = newStatus;
    setData(updatedItems);
  };
  return (
    <div>
      <h1 className="d-flex justify-content-between align-items-center">
        <span className="text-center flex-grow-1">{heading}</span>
        <button className="btn btn-success save-button" onClick={manualSave}>
          Save
        </button>
      </h1>
      <ul className="list-group">
        {data.map((item, index) => (
          <ListItem
            ind={index}
            taskName={item.taskName}
            status={item.status}
            handleDelete={handleDelete}
            handleStatusChange={handleStatusChange}
            data={data}
            setData={setData}
          />
        ))}
      </ul>
      <button
        className="btn btn-primary"
        style={{ position: "absolute", left: "0" }}
        onClick={handleAddItem}
      >
        +
      </button>
    </div>
  );
};

export default List;
