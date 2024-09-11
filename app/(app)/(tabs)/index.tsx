import { db } from "@/config/firebase";
import { FAB, ListItem } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const navigate = useNavigation();
  const [sorteios, setSorteios] = useState<any>([]);

  useEffect(() => {
    onSnapshot(collection(db, "sorteios"), (snapShot) => {
      setSorteios(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    });
  }, []);

  const onPressPressDrawing = (drawing: any) => {
    navigate.navigate("view", { id: drawing.id });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 22, textAlign: "center" }}>Seus sorteios</Text>

        <FlatList
          data={sorteios}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressPressDrawing(item)}>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                  <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                  <ListItem.Subtitle>
                    {item.minParticipants}
                    {" a "}
                    {item.maxParticipants} participantes
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          )}
        />
      </View>

      <FAB
        icon={{ name: "add", color: "white" }}
        onPress={() => navigate.navigate("add")}
        color="#1DA1F2"
        style={{ position: "absolute", bottom: 16, right: 16 }}
      />
    </SafeAreaView>
  );
}
