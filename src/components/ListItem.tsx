import { useState } from "react";

interface ListItemProps {
  ind: number;
  taskName: string;
  status: string;
  handleDelete: (index: number) => void;
  handleStatusChange: (index: number, newStatus: string) => void;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ListItem = ({
  ind,
  taskName,
  status,
  handleDelete,
  handleStatusChange,
  data,
  setData,
}: ListItemProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    setIsFocused(!isFocused);
  };
  const handleTaskChange = (
    event: React.SyntheticEvent<HTMLSpanElement>,
    ind: number
  ) => {
    const updatedItems = [...data]; // Create a copy of the state
    const target = event.currentTarget;

    // Update the task
    updatedItems[ind] = {
      ...updatedItems[ind],
      taskName: target.textContent || "",
    };
    setData(updatedItems);

    // Set the cursor position to the end
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(target);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center${
        isFocused ? " focused" : ""
      }`}
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      <span
        onInput={(event) => handleTaskChange(event, ind)}
        contentEditable
        suppressContentEditableWarning={true} // To suppress React warning about contentEditable
      >
        {taskName}
      </span>

      <select
        className={`form-control status-dropdown${isFocused ? " focused" : ""}`}
        value={status}
        onChange={(event) => handleStatusChange(ind, event.target.value)}
      >
        <option value="Select">Select</option>
        <option value="To-be-done">To-be-done</option>
        <option value="In-progress">In-progress</option>
        <option value="Done">Done</option>
      </select>
      {isFocused && (
        <button
          className="btn btn-danger"
          onClick={() => {
            handleDelete(ind);
          }}
          style={{ position: "absolute", right: "0" }}
        >
          X
        </button>
      )}
    </li>
  );
};

export default ListItem;
