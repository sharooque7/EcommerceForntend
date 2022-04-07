import React from "react";

const CategoryForm = ({ handleSubmt, name, setName }) => {
  return (
    <form onSubmit={handleSubmt}>
      <div className="form-group">
        <label className="mb-2" htmlFor="name">
          Name
        </label>

        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
          placeholder="Enter category name"
        />
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );
};

export default CategoryForm;
