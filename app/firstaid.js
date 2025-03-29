import { View, Text, ScrollView } from 'react-native';


export default function FirstAidScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>First Aid</Text>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
       
        {/* CPR */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🔥 CPR</Text>
          <Text style={{ textAlign: 'center' }}>
            - CPR: 30 chest compressions, 2 breaths. Repeat until help arrives.{"\n"}
          </Text>
        </View>


        {/* Bleeding */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🚑 Bleeding</Text>
          <Text style={{ textAlign: 'center' }}>
            - Bleeding: Apply direct pressure, elevate, and bandage.{"\n"}
          </Text>
        </View>


        {/* Sprains */}
        <View style={{ marginBottom: 20, width: '90%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🐻 Sprains</Text>
          <Text style={{ textAlign: 'center' }}>
            - Sprains: Rest, Ice, Compression, Elevation (RICE method).
          </Text>
        </View>


      </ScrollView>
    </View>
  );
}
