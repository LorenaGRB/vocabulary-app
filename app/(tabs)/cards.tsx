import { View, Text, StyleSheet } from "react-native";
export default function CardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CardsScreen</Text>
      <Text>Aquí irá la interfaz de tarjetas de repaso.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
});
