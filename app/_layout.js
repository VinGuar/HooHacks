import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen 
      name="survivortips" 
      options={{ 
        title: 'Survivor Tips',
        tabBarIcon: ({ color, size }) => <Ionicons name="survivortips" color={'red'} size={10}/>, 
        }} />
      <Tabs.Screen name="firstaid" options={{ title: 'First Aid' }} />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={'blue'} size={10} />,
  }}
/>
      <Tabs.Screen name="compass" options={{ title: 'Compass' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}