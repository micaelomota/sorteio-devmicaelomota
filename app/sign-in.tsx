import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "expo-router";
import { Button } from "@rneui/themed";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Icon } from "@rneui/base";
import { useAuth } from "@/components/AuthContext";

const SignInSchemaValidation = Yup.object().shape({
  email: Yup.string().email().required("O e-mail é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
});

type SignInFormValues = Yup.InferType<typeof SignInSchemaValidation>;

export default function SignInScreen() {
  const navigate = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, logout } = useAuth();

  const { isValid, errors, handleBlur, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {} as SignInFormValues,
      validationSchema: SignInSchemaValidation,
      onSubmit: async (values) => {
        setIsSubmitting(true);
        try {
          await login(values.email, values.password);
          navigate.navigate("(tabs)");
        } catch (e) {
          console.error(e);
        } finally {
          setIsSubmitting(false);
        }
      },
    });

  return (
    <ScrollView automaticallyAdjustKeyboardInsets style={{ flex: 1 }}>
      <View style={{ padding: 24, gap: 8 }}>
        <Icon name="user" type="font-awesome" size={48} />

        <TextInput
          style={style.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
        />

        <ErrorMessage error={errors.email} />

        <TextInput
          style={style.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={handleChange("description")}
          onBlur={handleBlur("description")}
        />

        <ErrorMessage error={errors.password} />

        <Button disabled={isValid} loading={isSubmitting} title="Entrar" />
        <Button loading={isSubmitting} type="outline" title="Cadastre-se" />
      </View>
    </ScrollView>
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
