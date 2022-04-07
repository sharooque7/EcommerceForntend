import axios from "axios";

//Get All Categories
export const getCategories = async () => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}categories`,
  });
};

//Get Single Category
export const getCategory = async (slug) => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}category/${slug}`,
  });
};

//Remove Category
export const removeCategory = async (authtoken, slug) => {
  return await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}category/${slug}`,
    headers: { authtoken: authtoken },
  });
};

//Update Category
export const updateCategory = async (authtoken, slug, categoryName) => {
  return await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}category/${slug}`,
    data: { name: categoryName },
    headers: { authtoken: authtoken },
  });
};

//Create Category
export const createCategory = async (authtoken, categoryName) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}category`,
    data: { name: categoryName },
    headers: { authtoken: authtoken },
  });
};

export const getCategorySubs = async (_id) => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}category/sub/${_id}`,
  });
};
