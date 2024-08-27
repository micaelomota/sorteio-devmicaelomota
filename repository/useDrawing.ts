import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

type Drawing = {
  participants: string[];
  winner: string;
};

export const useDrawing = () => {
  const [sorteios, setSorteios] = useState<string[]>([]);

  useEffect(() => {
    // onSnapshot(getCollection(db, "participants"), (snapshot) => {
  }, []);
  return {};
};
