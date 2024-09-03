import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function HomeScreen() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string>();
  const [newParticipant, setNewParticipant] = useState<string>("");

  const onPressAddParticipant = () => {
    if (newParticipant.trim() === "") {
      Alert.alert("Erro", "COLOCA UM NOME AÍ, PÔ!");
      return;
    }

    const _lowerCaseParticipant = newParticipant.toLowerCase();

    const capitalizedParticipant =
      _lowerCaseParticipant.charAt(0).toUpperCase() +
      _lowerCaseParticipant.slice(1);

    const noAccentsParticipant = capitalizedParticipant
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const x = new Set([...participants, noAccentsParticipant]);
    setParticipants([...x]);
    setNewParticipant("");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sorteio da live!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView>
        <ThemedText type="subtitle">Participantes</ThemedText>

        <FlatList
          data={participants}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => {
                Alert.alert(
                  "Remover participante",
                  `Deseja remover o participante ${item}?`,
                  [
                    {
                      text: "Cancelar",
                      style: "cancel",
                    },
                    {
                      text: "Remover",
                      style: "destructive",
                      onPress: () => {
                        setParticipants(participants.filter((p) => p !== item));
                      },
                    },
                  ],
                );
              }}
            >
              <ThemedText>{item}</ThemedText>
            </TouchableOpacity>
          )}
        />
      </ThemedView>

      <ThemedView>
        <ThemedText type="subtitle">Adicione membros</ThemedText>

        <TextInput
          placeholder="Nome do participante"
          value={newParticipant}
          onChangeText={setNewParticipant}
          style={{
            marginVertical: 16,
            borderColor: "lightgray",
            borderWidth: 1,
            padding: 16,
            borderRadius: 8,
          }}
        />

        <Button title="Adicionar" onPress={onPressAddParticipant} />
      </ThemedView>

      <ThemedView>
        <Button
          title="Resetar"
          onPress={() => {
            setParticipants([]);
            setWinner(undefined);
          }}
        />
      </ThemedView>

      <ThemedView>
        <Button
          title="Sortear"
          onPress={() => {
            if (participants.length === 0) {
              Alert.alert("Erro", "Adicione participantes para sortear!");
              return;
            }
            const randomIndex = Math.floor(Math.random() * participants.length);
            setWinner(participants[randomIndex]);
          }}
        />
      </ThemedView>

      {winner && (
        <ThemedView>
          <ThemedText type="subtitle">Ganhador</ThemedText>
          <ThemedText>{winner}</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
