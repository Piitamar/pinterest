import { useEffect, useState } from "react";
import { fetchPinById } from "./apiPins";

export function usePins(pinId) {
  const [pin, setPin] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPinById(pinId);
        setPin(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [pinId]);

  return pin;
}