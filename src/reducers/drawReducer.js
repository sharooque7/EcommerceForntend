export const drawReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_VISIBLE": {
      return action.payload;
    }
    default:
      return state;
  }
};
