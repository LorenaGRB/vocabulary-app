import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-word"
        options={{ presentation: "modal", title: "Add word" }}
      />
      <Stack.Screen
        name="edit-word"
        options={{ presentation: "modal", title: "Edit word" }}
      />
    </Stack>
  );
}
