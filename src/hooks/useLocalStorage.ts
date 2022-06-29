import React, { useEffect, useState } from "react";

// ! ------- GENERIC FUNCTION ----------
export function useLocalStorage<T>(
  field_name: string,
  // * Either the hook is type T or a function that returns the Type T - e.g. CartItem as T
  initial_value: T | (() => T)
) {
  // -------- WHAT IT DOES it gets the data from the local storage or get the inital value that was passed
  const [value, setValue] = useState<T>(
    // --------- LAZY STATE INITIALIZATION ---------
    () => {
      // Todo - setInitialState
      /* 
      1. Check if Local Storage has Items for key 'field_name'
      2. Execute initial_value function 
      3. Use plain initial_value: T
      */

      const jsonValue = localStorage.getItem(field_name);

      if (jsonValue != null) return JSON.parse(jsonValue);
      // IF FUNCTION => INVOKE
      if (typeof initial_value === "function") {
        // tell typescript that this is a invokable function that returns a type of T
        return (initial_value as () => T)();
      } else {
        return initial_value;
      }
    }
  );

  // If anyone updated the value with setValue = sync. it with the local storage
  useEffect(() => {
    localStorage.setItem(field_name, JSON.stringify(value));
  }, [field_name, value]);

  // alternative use typeof T
  // ! value, setValue - descended of useState("")
  return [value, setValue] as [
    typeof value,
    React.Dispatch<React.SetStateAction<T>>
  ];
}
