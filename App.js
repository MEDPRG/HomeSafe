import { StyleSheet } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { UserProvider } from "./navigation/UserContext";

export default function App() {
  return (
    <UserProvider>
      <StackNavigator />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
