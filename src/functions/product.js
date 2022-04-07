import axios from "axios";

//Get Single Category
export const getCategory = async (authtoken, slug) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}/category/${slug}`,
    headers: { authtoken: authtoken },
  });
};

//Remove Category
export const removeCategory = async (authtoken, slug) => {
  return await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}/category/${slug}`,
    headers: { authtoken: authtoken },
  });
};

//Update Category
export const updateCategory = async (authtoken, slug, categoryName) => {
  return await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}/category/${slug}`,
    data: { name: categoryName },
    headers: { authtoken: authtoken },
  });
};

//Create Products
export const createProduct = async (authtoken, product) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}/createproduct`,
    data: { ...product },
    headers: { authtoken: authtoken },
  });
};

//Get All procuts
export const getProductsByCount = async (count) => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}products/${count}`,
  });
};

export const removeProduct = async (slug, authtoken) => {
  return await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}products/${slug}`,
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}product/${slug}`,
  });
};

export const updateProduct = async (slug, product, authtoken) => {
  return await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}product/${slug}`,
    data: { ...product },
    headers: {
      authtoken,
    },
  });
};

export const getProducts = async (sort, order, page) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}products/`,
    data: { sort, order, page },
  });
};

export const getProductsCount = async () => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}products/total`,
  });
};

export const productStar = async (productId, star, authtoken) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}product/star/${productId}`,
    data: { star },
    headers: {
      authtoken,
    },
  });
};

export const getRelated = async (productId) => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}product/related/${productId}`,
  });
};

export const fetchProductsByFilter = async (data) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}search/filters/`,
    data: data,
  });
};
