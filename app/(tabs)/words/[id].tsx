import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useWordsStore } from "../../../store/words";

export default function WordDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const wordId = Number(id);
  const { words, markAsLearned } = useWordsStore();
  const [word, setWord] = useState(() => words.find((w) => w.id === wordId));
  useEffect(() => {
    const updatedWord = words.find((w) => w.id === wordId);
    setWord(updatedWord);
  }, [words]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => router.push(`/edit-word?id=${wordId}`)}
        >
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, wordId]);
  if (!word) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Palabra no encontrada</Text>
      </View>
    );
  }
  const handleMarkLearned = () => {
    markAsLearned(word.id);
    router.back(); // volver a la lista tras marcar como aprendida
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{word.term}</Text>
      <Text style={styles.definition}>{word.definition}</Text>
      <Text style={styles.state}>
        Estado:{" "}
        {word.state === "to-learn"
          ? "Pendiente"
          : word.state === "learning"
          ? "En progreso"
          : "Aprendida"}
      </Text>
      {word.state !== "learned" && (
        <TouchableOpacity
          onPress={handleMarkLearned}
          style={styles.learnedButton}
        >
          <Text style={styles.learnedButtonText}>Marcar como "Aprendida"</Text>
        </TouchableOpacity>
      )}
      {word.state === "learned" && (
        <Text style={styles.learnedLabel}>Ya has aprendido esta palabra.</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  definition: { fontSize: 18, marginBottom: 20 },
  state: { fontSize: 16, fontStyle: "italic", marginBottom: 30 },
  editButton: { color: "#007aff", fontSize: 16, marginRight: 10 },
  learnedButton: { backgroundColor: "#4caf50", padding: 10, borderRadius: 5 },
  learnedButtonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  learnedLabel: {
    marginTop: 10,
    fontSize: 16,
    color: "#4caf50",
    fontWeight: "bold",
  },
});
