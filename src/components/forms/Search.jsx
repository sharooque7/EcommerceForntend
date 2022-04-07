import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const history = useHistory();
  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };
  return (
    <form
      className="form-inline my-2 my-lg-0"
      style={{ border: "none" }}
      onSubmit={handleSubmit}
    >
      <span className="form-control" style={{ border: "none" }}>
        {" "}
        <input
          onChange={handleChange}
          type="search"
          value={text}
          placeholder="Search"
          className="search"
        />
        <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
      </span>
    </form>
  );
};

export default Search;