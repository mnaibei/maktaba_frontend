import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BookList from "./src/components/BookList";
import BookDetails from "./src/components/BookDetails";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen
          name="BookList"
          component={BookList}
          options={({ navigation }) => ({ title: "Book List" })}
        />
        <Stack.Screen name="BookDetails" component={BookDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
