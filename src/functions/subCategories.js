import axios from "axios";

//Get All Categories
export const getSubCategories = async () => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}subcategories`,
  });
};

//Get Single Category
export const getSubCategory = async (slug) => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}subcategory/${slug}`,
  });
};

//Remove Category
export const removeSubCategory = async (authtoken, slug) => {
  return await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}subcategory/${slug}`,
    headers: { authtoken: authtoken },
  });
};

//Update Category
export const updateSubCategory = async (authtoken, slug, categoryName, id) => {
  return await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}subcategory/${slug}`,
    data: { name: categoryName, id },
    headers: { authtoken: authtoken },
  });
};

//Create Category
export const createSubCategory = async (authtoken, categoryName, id) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}subcategory`,
    data: { name: categoryName, id },
    headers: { authtoken: authtoken },
  });
};
