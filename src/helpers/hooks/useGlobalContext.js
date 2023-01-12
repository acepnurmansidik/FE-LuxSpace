import React, { createContext, useContext, useReducer } from "react";

// buat contextnya/reduxnya
const Context = createContext();

// buat intial state
const initialState = {
  cart: {},
};

export function useGlobalContext() {
  const [state, dispatch] = useContext(Context);

  // cek jika apakah contextnya ada
  if (!state || !dispatch) {
    throw new Error("useGlobalContect must be used within a Provider");
  }

  return { state, dispatch };
}

// lalu buat reducernya
function Reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart
          ? { ...state.cart, [action.item.id]: action.item }
          : { [action.item.id]: action.item },
      };

    default:
      throw new Error(`Unhadle action type ${action.type}`);
  }
}

// setelah itu buat pembungkusnya(Provider)nya yang menerima props apapun
export default function Provider(props) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  // return props apapun yang dimiliki
  return <Context.Provider value={[state, dispatch]} {...props} />;
}
