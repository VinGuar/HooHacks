import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const scenes = {
  start: {
    prompt: "You arrive at a remote forest campsite. The sun is setting, and the air is getting cold. What do you do first?",
    choices: [
      { option: "Set up your tent", next: "tent", effects: { warmth: 1 } },
      { option: "Gather firewood", next: "firewood", effects: { inventory: 'firewood' } },
      { option: "Look for water", next: "stream", effects: { inventory: 'water' } },
    ],
  },
  tent: {
    prompt: "You set up your tent, giving you shelter. Now what?",
    choices: [
      { option: "Gather firewood", next: "firewood", effects: { inventory: 'firewood' } },
      { option: "Look for water", next: "stream", effects: { inventory: 'water' } },
      { option: "Explore the woods", next: "explore", effects: {} },
    ],
  },
  firewood: {
    prompt: "You collect dry sticks and logs. It's enough for a fire tonight.",
    choices: [
      { option: "Return to camp", next: "tent", effects: {} },
      { option: "Look for water", next: "stream", effects: { inventory: 'water' } },
    ],
  },
  stream: {
    prompt: "You find a nearby stream. It's clean and refreshing.",
    choices: [
      { option: "Fill water bottle", next: "returnWithWater", effects: { inventory: 'water', hydration: 2 } },
      { option: "Drink and explore upstream", next: "explore", effects: { hydration: 1 } },
      { option: "Eat berries nearby", next: "badBerries", effects: { hydration: -1 } },
    ],
  },
  badBerries: {
    prompt: "The berries were poisonous! You lose hydration as your stomach churns.",
    choices: [
      { option: "Rest in your tent", next: "tent", effects: {} },
    ],
  },
  explore: {
    prompt: "You venture further and find animal tracks. The air gets colder.",
    choices: [
      { option: "Follow tracks", next: "animalEncounter", effects: { warmth: -1 } },
      { option: "Return to camp", next: "tent", effects: {} },
    ],
  },
  animalEncounter: {
    prompt: "You encounter a fox trapped in a snare. It's injured but alert.",
    choices: [
      { option: "Free the fox", next: "foxFriend", effects: {} },
      { option: "Ignore and keep walking", next: "lostTrail", effects: { warmth: -1 } },
    ],
  },
  foxFriend: {
    prompt: "The fox limps away but leads you to a small cave with dry wood and berries.",
    choices: [
      { option: "Take supplies", next: "returnWithLoot", effects: { inventory: 'berries', warmth: 1, hydration: 1 } },
    ],
  },
  lostTrail: {
    prompt: "You lose your way and spend hours wandering.",
    choices: [
      { option: "Climb a tree to look around", next: "fall", effects: { warmth: -1 } },
      { option: "Wait until morning", next: "coldNight", effects: { warmth: -2 } },
    ],
  },
  fall: {
    prompt: "You fall from the tree and injure your leg.",
    choices: [
      { option: "Crawl back slowly", next: "campfire", effects: { warmth: -1 } },
    ],
  },
  coldNight: {
    prompt: "It was a freezing night. You barely slept and lost warmth.",
    choices: [
      { option: "Search for landmarks", next: "cabin", effects: { warmth: -1 } },
    ],
  },
  returnWithWater: {
    prompt: "You return to camp with water. You feel more prepared.",
    choices: [
      { option: "Build a fire", next: "campfire", effects: { warmth: 2 } },
      { option: "Cook some berries", next: "cookBerries", effects: { hydration: 1 } },
    ],
  },
  returnWithLoot: {
    prompt: "You bring back berries and wood. The fire burns strong tonight.",
    choices: [
      { option: "Sleep", next: "night", effects: {} },
    ],
  },
  cookBerries: {
    prompt: "You cook the berries over the fire. They're surprisingly tasty.",
    choices: [
      { option: "Sleep", next: "night", effects: {} },
    ],
  },
  campfire: {
    prompt: "You light a fire. It warms you and keeps wild animals away. Night falls.",
    choices: [
      { option: "Sleep", next: "night", effects: {} },
      { option: "Stay up and listen", next: "creatureNoise", effects: { warmth: -1 } },
    ],
  },
  creatureNoise: {
    prompt: "You hear rustling. It’s just a raccoon. But you lost some warmth staying up.",
    choices: [
      { option: "Sleep", next: "night", effects: {} },
    ],
  },
  night: {
    prompt: "Morning comes. You survived the night. What's your plan today?",
    choices: [
      { option: "Explore a cave", next: "cave", effects: {} },
      { option: "Hike deeper into the woods", next: "deepWoods", effects: { hydration: -1 } },
      { option: "Climb to a high point", next: "lookout", effects: {} },
    ],
  },
  cave: {
    prompt: "You find shelter and supplies left by past hikers.",
    choices: [
      { option: "Take supplies and return", next: "goodEnding", effects: { hydration: 2, warmth: 2 } },
    ],
  },
  deepWoods: {
    prompt: "You get lost and run out of water...",
    choices: [
      { option: "Try to retrace steps", next: "badEnding", effects: {} },
    ],
  },
  lookout: {
    prompt: "From the top, you spot a ranger cabin in the distance.",
    choices: [
      { option: "Head toward cabin", next: "cabin", effects: {} },
    ],
  },
  cabin: {
    prompt: "You find an old ranger cabin. There’s food and radio equipment.",
    choices: [
      { option: "Use radio to call for help", next: "rescue", effects: {} },
    ],
  },
  rescue: {
    prompt: "You’re rescued the next morning. You survived! 🚁",
    choices: [
      { option: "Play Again", next: "start", effects: { reset: true } },
    ],
  },
  goodEnding: {
    prompt: "You survive comfortably with the supplies you found. You hike out in the morning.",
    choices: [{ option: "Play Again", next: "start", effects: { reset: true } }],
  },
  badEnding: {
    prompt: "You become dehydrated and disoriented. Your journey ends here. 💀",
    choices: [{ option: "Restart", next: "start", effects: { reset: true } }],
  },
};


export default function CampingRPG() {
  const [sceneKey, setSceneKey] = useState('start');
  const scene = scenes[sceneKey];

  return (
    <ImageBackground
      source={require('../assets/images/Forest.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.35 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🌲 Camping Survival RPG 🌲</Text>

        <View style={styles.promptBox}>
          <Text style={styles.prompt}>{scene.prompt}</Text>
        </View>

        {scene.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => setSceneKey(choice.next)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{choice.option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e9edc9',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  promptBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  prompt: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#31572c',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fefae0',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});