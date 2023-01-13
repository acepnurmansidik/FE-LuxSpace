import { useState } from "react";

export default function useForm(intialState) {
  // buat payloadnya dari state
  const [state, setState] = useState(intialState);

  function fnUpdateState(event) {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.values,
    }));
  }

  return { state, fnUpdateState };
}
