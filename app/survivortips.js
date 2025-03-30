import { View, Text, ScrollView } from 'react-native';

export default function SurvivorTipsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Survivor Tips</Text>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {/* Fire-starting */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🔥 Fire-Starting</Text>
          <Text style={{ textAlign: 'center' }}>
            Use dry leaves and small sticks as tinder. Rub two dry sticks together or use a fire starter for best results.
          </Text>
        </View>


        {/* Wild Animal Safety */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🐻 Wild Animal Safety</Text>
          <Text style={{ textAlign: 'center' }}>
            - **Bears**: Stay calm, make yourself look big, don’t run.{"\n"}
            - **Snakes**: Stay still if bitten, keep the wound below heart level.{"\n"}
            - **Mountain Lions**: Maintain eye contact, back away slowly.
          </Text>
        </View>

        {/* Weather Survival */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>⛈️ Weather Survival</Text>
          <Text style={{ textAlign: 'center' }}>
            - **Hypothermia**: Layer up, stay dry, move around.{"\n"}
            - **Heatstroke**: Hydrate, find shade, wet your clothes.{"\n"}
            - **Lightning**: Avoid open fields, stay low, avoid trees.
          </Text>
        </View>

        {/* Water Purification */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>💧 Water Purification</Text>
          <Text style={{ textAlign: 'center' }}>
            Boil water for at least **1 minute** or use purification tablets before drinking.
          </Text>
        </View>

        {/* Edible vs. Poisonous Plants */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🌿 Edible vs. Poisonous Plants</Text>
          <Text style={{ textAlign: 'center' }}>
            - **Edible**: Dandelions, cattails, wild berries (avoid white ones).{"\n"}
            - **Poisonous**: Bright-colored mushrooms, milky sap plants, bitter-tasting leaves.
          </Text>
        </View>

        {/* CPR */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>❤️‍🩹 CPR</Text>
          <Text style={{ textAlign: 'center' }}>
            - CPR: 30 chest compressions, 2 breaths. Repeat until help arrives.{"\n"}
          </Text>
        </View>

        {/* Bleeding */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🩸 Bleeding</Text>
          <Text style={{ textAlign: 'center' }}>
            - Bleeding: Apply direct pressure, elevate, and bandage.{"\n"}
          </Text>
        </View>
        {/* Sprains */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🦶 Sprains</Text>
          <Text style={{ textAlign: 'center' }}>
            - Sprains: Rest, Ice, Compression, Elevation (RICE method).
          </Text>
        </View>
        {/* Sprains */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🦶 Sprains</Text>
          <Text style={{ textAlign: 'center' }}>
            - Sprains: Rest, Ice, Compression, Elevation (RICE method).
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
