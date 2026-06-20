import { useEffect, useState } from "react";
import { getUserByPin } from "../pins/apiPins";

export function useUser(pinId) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getUserByPin(pinId);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [pinId]);

  return user;
}