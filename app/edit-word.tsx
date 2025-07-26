import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useWordsStore } from "../store/words";
export default function EditWordModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const wordId = Number(id);
  const { words, updateWord } = useWordsStore();
  const word = words.find((w) => w.id === wordId);
  const [term, setTerm] = useState(word?.term || "");
  const [definition, setDefinition] = useState(word?.definition || "");
  const handleSave = async () => {
    if (!term.trim() || !definition.trim()) {
      Alert.alert(
        "Campos requeridos",
        "La palabra y su definición no puedenestar vacías."
      );
      return;
    }
    if (!word) {
      Alert.alert("Error", "No se encontró la palabra a editar.");
      return;
    }
    const updated = await updateWord(word.id, {
      term: term.trim(),
      definition: definition.trim(),
    });
    if (!updated) {
      Alert.alert("Error", "No se pudieron guardar los cambios.");
    } else {
      router.back(); // Cerrar el modal tras guardar
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Palabra</Text>
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
      <Button title="Guardar Cambios" onPress={handleSave} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
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
