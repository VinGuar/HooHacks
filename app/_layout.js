import { Tabs } from 'expo-router';
import CustomTabBar from '../components/CustomTabBar';

export default function Layout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="index" options = {{ title: "Games"}} />
      <Tabs.Screen name="survivorTipsPage" options={{ title: "Tips" }} />
      <Tabs.Screen name="animalLogPage" options={{ title: "Animal Log" }} />
      <Tabs.Screen name="compassPage" options={{ title: "Compass" }} />
    </Tabs>
  );
}
