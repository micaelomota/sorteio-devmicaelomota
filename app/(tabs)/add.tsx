import { db } from "@/config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "expo-router";

const ErrorMessage = ({ error }: { error?: string }) => {
  if (!error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return null;
};

const DrawingSchemaValidation = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  description: Yup.string().required("A descrição é obrigatória"),
  minParticipants: Yup.number().required(
    "O mínimo de participantes é obrigatório",
  ),
  maxParticipants: Yup.number().required(
    "O máximo de participantes é obrigatório",
  ),
});

type DrawingFormValues = Yup.InferType<typeof DrawingSchemaValidation>;

export default function HomeScreen() {
  const navigate = useNavigation();

  useEffect(() => {
    onSnapshot(collection(db, "sorteios"), (snapShot) => {
      console.log(snapShot.docs);
    });
  }, []);

  const { errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {} as DrawingFormValues,
    onSubmit: (values) => {
      addDoc(collection(db, "sorteios"), values);
      navigate.navigate("index");
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24, gap: 8 }}>
        <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 16 }}>
          Adicionar Sorteio
        </Text>

        <TextInput
          style={style.input}
          placeholder="Nome do sorteio"
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
        />
        <ErrorMessage error={errors.name} />

        <TextInput
          style={[style.input, { height: 100 }]}
          placeholder="Descrição"
          multiline
          numberOfLines={3}
          onChangeText={handleChange("description")}
          onBlur={handleBlur("description")}
        />

        <ErrorMessage error={errors.description} />

        <TextInput
          style={style.input}
          placeholder="Mínimo de pessoas"
          onChangeText={handleChange("minParticipants")}
        />

        <ErrorMessage error={errors.minParticipants} />

        <TextInput
          style={style.input}
          placeholder="Máximo de pessoas"
          onChangeText={handleChange("maxParticipants")}
          onBlur={handleBlur("maxParticipants")}
        />

        <ErrorMessage error={errors.maxParticipants} />

        <View style={{ marginTop: 16 }}>
          <Button title="Criar sorteio" onPress={() => handleSubmit()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  input: {
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
  },
});
