import React from "react";

const Sidebar = ({ name, active, handleclick }) => {
  return (
    <button
      className={`sidebar-items ${active ? "active" : null}`}
      onClick={handleclick}
    >
      {name}
    </button>
  );
};

export default Sidebar;
