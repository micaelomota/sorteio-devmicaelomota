import { db } from "@/config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "expo-router";
import { Button } from "@rneui/themed";

const ErrorMessage = ({ error }: { error?: string }) => {
  if (error) {
    return <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>;
  }

  return null;
};

// TODO: Add validation to the form for numbers
const DrawingSchemaValidation = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  description: Yup.string().required("A descrição é obrigatória"),
  minParticipants: Yup.number()
    .min(2)
    .required("O mínimo de participantes é obrigatório"),
  maxParticipants: Yup.number().required(
    "O máximo de participantes é obrigatório",
  ),
});

type DrawingFormValues = Yup.InferType<typeof DrawingSchemaValidation>;

export default function HomeScreen() {
  const navigate = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, "sorteios"), (snapShot) => {
      console.log(snapShot.docs);
    });
  }, []);

  const { errors, handleBlur, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {} as DrawingFormValues,
      validationSchema: DrawingSchemaValidation,
      onSubmit: async (values) => {
        setIsSubmitting(true);
        try {
          await addDoc(collection(db, "sorteios"), values);
          resetForm({});
          navigate.navigate("drawing");
        } catch (e) {
          console.error(e);
        } finally {
          setIsSubmitting(false);
        }
      },
    });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24, gap: 8 }}>
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
          keyboardType="number-pad"
          onChangeText={handleChange("minParticipants")}
        />

        <ErrorMessage error={errors.minParticipants} />

        <TextInput
          style={style.input}
          placeholder="Máximo de pessoas"
          keyboardType="number-pad"
          onChangeText={handleChange("maxParticipants")}
          onBlur={handleBlur("maxParticipants")}
        />

        <ErrorMessage error={errors.maxParticipants} />

        <View style={{ marginTop: 16 }}>
          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            title="Criar sorteio"
            onPress={() => handleSubmit()}
          />
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
