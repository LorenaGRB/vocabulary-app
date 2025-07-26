import { View, Text, StyleSheet } from "react-native";
export default function WordsListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WordsListScreen</Text>
      <Text>Aquí se listarán las palabras a aprender.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
});
