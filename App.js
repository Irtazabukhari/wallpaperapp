import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { RecoilRoot } from 'recoil';
import Screen1 from './views/Screen1';
import Screen2 from './views/Screen2';
import IntroScreen from './views/IntroScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Intro'>
          <Stack.Screen 
            name='Intro' 
            component={IntroScreen}
            options={{ headerShown: false }} // Hide header for Intro screen
          />
          <Stack.Screen 
            name='S1' 
            component={Screen1}
            options={{
              headerStyle: { backgroundColor: "#ff6f61" },
              headerTintColor: "white",
              headerTitleStyle: { fontWeight: "bold" },
              headerTitleAlign: "center",
              title: "Home",
            }}
          />
          <Stack.Screen 
            name="S2" 
            component={Screen2} 
            options={{
              headerStyle: { backgroundColor: "#000000" },
              headerTintColor: "white",
              headerTitleStyle: { fontWeight: "bold" },
              headerTitleAlign: "center",
              title: "Back",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    height: "100%",
    alignItems: 'center',
  },
});
