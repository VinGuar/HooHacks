import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform
} from 'react-native';

export default function SurvivorTipsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eef5db" />
      <Text style={styles.title}>🌲 Survivor Tips 🌲</Text>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Tip title="🔥 Fire-Starting">
          Use dry leaves and small sticks as tinder. Rub two dry sticks together or use a fire starter for best results.
        </Tip>

        <Tip title="🐻 Wild Animal Safety">
          <Text>- <Text style={styles.bold}>Bears</Text>: Stay calm, make yourself look big, don’t run.{"\n"}</Text>
          <Text>- <Text style={styles.bold}>Snakes</Text>: Stay still if bitten, keep the wound below heart level.{"\n"}</Text>
          <Text>- <Text style={styles.bold}>Mountain Lions</Text>: Maintain eye contact, back away slowly.</Text>
        </Tip>

        <Tip title="⛈️ Weather Survival">
          <Text>- <Text style={styles.bold}>Hypothermia</Text>: Layer up, stay dry, move around.{"\n"}</Text>
          <Text>- <Text style={styles.bold}>Heatstroke</Text>: Hydrate, find shade, wet your clothes.{"\n"}</Text>
          <Text>- <Text style={styles.bold}>Lightning</Text>: Avoid open fields, stay low, avoid trees.</Text>
        </Tip>

        <Tip title="💧 Water Purification">
          Boil water for at least <Text style={styles.bold}>1 minute</Text> or use purification tablets before drinking.
        </Tip>

        <Tip title="🌿 Edible vs. Poisonous Plants">
          <Text>- <Text style={styles.bold}>Edible</Text>: Dandelions, cattails, wild berries (avoid white ones).{"\n"}</Text>
          <Text>- <Text style={styles.bold}>Poisonous</Text>: Bright-colored mushrooms, milky sap plants, bitter-tasting leaves.</Text>
        </Tip>

        <Tip title="❤️‍🩹 CPR">
          CPR: 30 chest compressions, 2 breaths. Repeat until help arrives.
        </Tip>

        <Tip title="🩸 Bleeding">
          Apply direct pressure, elevate, and bandage.
        </Tip>

        <Tip title="🦶 Sprains">
          Rest, Ice, Compression, Elevation (RICE method).
        </Tip>

        <View style={{ height: 80 }} /> {/* Give breathing room at bottom */}
      </ScrollView>
    </SafeAreaView>
  );
}

function Tip({ title, children }) {
  return (
    <View style={styles.tipContainer}>
      <Text style={styles.tipTitle}>{title}</Text>
      <Text style={styles.tipText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef5db',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    paddingBottom: 100,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: '#2f3e46',
    textAlign: 'center',
  },
  tipContainer: {
    backgroundColor: '#cad2c5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#354f52',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: '#354f52',
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold',
  },
});
