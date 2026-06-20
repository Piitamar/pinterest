import { useEffect, useState } from "react";
import { fetchPins } from "./apiPins";

export function usePins() {
  const [pinData, setPinData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPins();
        setPinData(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  return pinData;
}