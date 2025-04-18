import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const tabIcons = {
  survivortips: 'book',
  game: 'game-controller',
  animallogger: 'paw',
  compass: 'compass',
  login: 'lock-open',

};


const defaultColors = {
    survivortips: '#6A67CE', // Purple
  game: '#FF9500',           // Orange
  animallogger: '#00C9A7',    // Teal
  compass: '#007AFF',      // Blue
};


const activeColor = '#888';


const allowedRoutes = ['survivortips', 'game', 'animallogger', 'compass', 'login'];

export default function CustomTabBar({ state, descriptors, navigation }) {
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {

        if (!allowedRoutes.includes(route.name)) return null;

        const isFocused = state.index === index;
        const routeName = route.name;


        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            router.push(`/${routeName}`);
        }
        };


        const iconName = tabIcons[routeName];
        const label = descriptors[route.key]?.options?.title || routeName;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? activeColor : defaultColors[routeName]}
            />
            <Text
              style={[
                styles.label,
                { color: isFocused ? activeColor : defaultColors[routeName] },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#eef5db',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    textTransform: 'capitalize',
  },
});