import { Stack } from "expo-router";
export default function WordsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#000",
        headerShown: false,
      }}
    ></Stack>
  );
}
