import { Tabs, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import { useEffect, useState } from 'react';
import CustomTabBar from '../components/CustomTabBar';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments(); // ['login'] or ['home'], etc.

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email || 'no user');
      setUser(firebaseUser);
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (checkingAuth) return;

    const isAuthScreen = segments[0] === 'login' || segments[0] === 'signup';

    if (!user && !isAuthScreen) {
      router.replace('/login');
    }

    
  }, [checkingAuth, user, segments]);

  if (checkingAuth) return null; 

  return (
    
    <Tabs 
      screenOptions={{
        headerShown: false, 
      }}
      
      tabBar={(props) => <CustomTabBar {...props} />}>
       <Tabs.Screen name="survivortips" options={{ title: "Tips" }} />
      <Tabs.Screen name="compass" options={{ title: "Compass" }} />
    
      <Tabs.Screen name="game" options = {{ tabBarItemStyle: {display: 'none'}}} />
      <Tabs.Screen name="animallogger" options={{ title: "Animal Log" }} />

      <Tabs.Screen name="login" options={{ title: "Log-in" }} />

    </Tabs>
  );
}
