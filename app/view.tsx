import { db } from "@/config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "expo-router";
import { Button } from "@rneui/themed";

export default function ViewDrawingScreen() {
  const navigate = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24, gap: 8 }}></View>
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
