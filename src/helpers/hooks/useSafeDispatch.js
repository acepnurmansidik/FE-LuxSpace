import { useCallback, useLayoutEffect, useRef } from "react";

export default function useSafeDispatch(dispatch) {
  // *dispacth function yang dilewatin
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;

    // update ketika statenya di cabut dari halaman/berpindah halaman
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}
