import { db } from "@/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const [sorteios, setSorteios] = useState<any>([]);

  useEffect(() => {
    onSnapshot(collection(db, "sorteios"), (snapShot) => {
      setSorteios(snapShot.docs.map((doc) => doc.data()));
    });
  }, []);

  console.log(sorteios);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Sorteios</Text>

      <FlatList
        data={sorteios}
        renderItem={({ item }) => (
          <View>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
