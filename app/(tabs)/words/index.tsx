import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useWordsStore } from "../../../store/words";

interface WordItem {
  id: number;
  term: string;
  definition: string;
  state: "to-learn" | "learning" | "learned";
}

export default function WordsListScreen() {
  const router = useRouter();
  const { words, loadWords } = useWordsStore();

  useEffect(() => {
    loadWords().catch((err) => console.error("Error loading words:", err));
  }, []);
  const renderItem = ({ item }: { item: WordItem }) => {
    let statusIcon = " "; // to-learn por defecto
    if (item.state === "learning") statusIcon = " ";
    if (item.state === "learned") statusIcon = " ";
    return (
      <TouchableOpacity
        style={styles.wordItem}
        onPress={() => router.push(`/words/${item.id}`)}
      >
        <Text style={styles.wordText}>
          {statusIcon} {item.term}
          <Text style={styles.subText}> – {item.definition}</Text>
        </Text>
        {item.state !== "learned" && (
          <Text style={styles.stateTag}>
            {item.state === "to-learn" ? "Pendiente" : "En progreso"}
          </Text>
        )}
        {item.state === "learned" && (
          <Text style={styles.stateTag}>Aprendida</Text>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Palabras ({words.length})</Text>
      <FlatList
        data={words}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay palabras. ¡Agrega una!</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      {/** Botón para abrir el modal de agregar palabra */}
      <View style={styles.addButtonContainer}>
        <Button
          title="Agregar Palabra"
          onPress={() => router.push("/add-word")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", position: "relative" },
  header: { fontSize: 20, fontWeight: "bold", padding: 16 },
  wordItem: {
    padding: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  wordText: { fontSize: 16 },
  subText: { fontSize: 14, color: "#555" },
  stateTag: {
    position: "absolute",
    right: 16,
    top: 18,
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});
