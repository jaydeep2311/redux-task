export const GET_TODOS = "GET_TODOS";

export const getTodos = (payload) => {
  return {
    type: GET_TODOS,
    payload: payload,
  };
};
