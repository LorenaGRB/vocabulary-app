import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useWordsStore } from "../store/words";
export default function AddWordModal() {
  const router = useRouter();
  const addWord = useWordsStore((state) => state.addWord);
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const handleAdd = async () => {
    if (!term.trim() || !definition.trim()) {
      Alert.alert(
        "Campos requeridos",
        "Por favor ingresa la palabra y sudefinición."
      );
      return;
    }
    // Llamar acción global para agregar palabra
    const newWord = await addWord({
      term: term.trim(),
      definition: definition.trim(),
      state: "to-learn",
    });
    if (!newWord) {
      Alert.alert("Error", "No se pudo agregar la palabra. Intenta de nuevo.");
    } else {
      // Cerrar el modal al terminar (volver atrás en la navegación)
      router.back();
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nueva Palabra</Text>

        <TextInput
          placeholder="Palabra"
          value={term}
          onChangeText={setTerm}
          style={styles.input}
        />

        <TextInput
          placeholder="Definición o traducción"
          value={definition}
          onChangeText={setDefinition}
          style={styles.input}
        />

        <Button title="Agregar" onPress={handleAdd} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
});
