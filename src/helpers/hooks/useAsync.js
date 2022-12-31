import { useCallback, useReducer, useRef } from "react";
import useSafeDispatch from "./useSafeDispatch";

const defaultState = {
  data: null,
  status: "idle",
  error: null,
};

export default function useAsync(initialState) {
  // buat initialState dari useRef
  const initialStateRef = useRef({
    ...defaultState,
    ...initialState,
  });

  const [{ data, status, error }, dispatch] = useReducer((state, action) => {
    return { ...state, ...action };
  }, initialStateRef.current);

  // setState yang aman pada saat berpindah halaman/blining memori
  const safeSetState = useSafeDispatch(dispatch);

  const run = useCallback(
    (promise) => {
      // cek jika tidak ada datanya/error
      if (!promise || !promise.then)
        throw new Error(
          "The arhument passed to useAsync().run must be promise!"
        );
      safeSetState({ status: "pending" });
      return promise.then(
        (data) => {
          safeSetState({ data, status: "resolved" });

          return data;
        },
        (error) => {
          safeSetState({
            status: "rejected",
            error: JSON.parse(error.message),
          });
        }
      );
    },
    [safeSetState]
  );

  const setData = useCallback(
    (data) => {
      safeSetState({ data });
    },
    [safeSetState]
  );

  const setError = useCallback(
    (error) => {
      safeSetState({ error });
    },
    [safeSetState]
  );

  const reset = useCallback(() => {
    safeSetState(initialStateRef.current);
  }, [safeSetState]);

  return {
    data,
    status,
    error,
    run,
    setData,
    setError,
    reset,
    isIdle: status === "idle",
    isLoading: status === "idle" || status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
  };
}
