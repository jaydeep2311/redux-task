import { GET_TODOS } from "./action";

export const reducer = (
  store = {
    todos: [],
  },
  { type, payload }
) => {
  switch (type) {
    case GET_TODOS:
      return {
        todos: [...payload],
      };
    default:
      return store;
  }
};
