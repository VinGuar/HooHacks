import { Tabs, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import { useEffect, useState } from 'react';

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

  if (checkingAuth) return null; // or show loading indicator

  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="animallogger" options={{ title: 'Animal Logger' }} />
      <Tabs.Screen name="firstaid" options={{ title: 'First Aid' }} />
      <Tabs.Screen name="survivortips" options={{ title: 'Survivor Tips' }} />
      <Tabs.Screen name="compass" options={{ title: 'Compass' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="loggin" options={{ title: 'Log in' }} />

      <Tabs.Screen name="signup" options={{ tabBarItemStyle: {display: 'none'}}} />

    </Tabs>
  );
}
