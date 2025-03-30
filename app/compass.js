import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground } from 'react-native';
import { Magnetometer, Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';

function getTiltCompensatedHeading(ax, ay, az, mx, my, mz) {
  const pitch = Math.atan2(-ax, Math.sqrt(ay * ay + az * az));
  const roll = Math.atan2(ay, az);
  const xh = mx * Math.cos(pitch) + mz * Math.sin(pitch);
  const yh =
    mx * Math.sin(roll) * Math.sin(pitch) +
    my * Math.cos(roll) -
    mz * Math.sin(roll) * Math.cos(pitch);
  let heading = (Math.atan2(yh, xh) * 180) / Math.PI;
  if (heading < 0) heading += 360;
  return ((90 - heading) + 360) % 360;
}

export default function CompassPage() {
  const [heading, setHeading] = useState(0);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    let accelSub = null;
    let magnetSub = null;

    const subscribeSensors = () => {
      let accel = { x: 0, y: 0, z: 0 };
      let magnet = { x: 0, y: 0, z: 0 };

      Accelerometer.setUpdateInterval(200);
      Magnetometer.setUpdateInterval(200);

      accelSub = Accelerometer.addListener(({ x, y, z }) => {
        accel = { x, y, z };
        updateHeading(accel, magnet);
      });

      magnetSub = Magnetometer.addListener(({ x, y, z }) => {
        magnet = { x, y, z };
        updateHeading(accel, magnet);
      });
    };

    const updateHeading = (accel, magnet) => {
      const newHeading = getTiltCompensatedHeading(
        accel.x, accel.y, accel.z,
        magnet.x, magnet.y, magnet.z
      );
      setHeading(newHeading.toFixed(1));
    };

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      const addr = await Location.reverseGeocodeAsync(loc.coords);
      if (addr.length) {
        const { city, region, country } = addr[0];
        setAddress(`${city}, ${region}, ${country}`);
      }
    };

    if (Platform.OS !== 'web') {
      subscribeSensors();
    }

    getLocation();

    return () => {
      if (Platform.OS !== 'web') {
        accelSub && accelSub.remove();
        magnetSub && magnetSub.remove();
      }
    };
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/Forest.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.container}>
        <View style={styles.headingBox}>
          <Text style={styles.heading}>🧭 Compass: {heading}°</Text>
        </View>
        {location && (
          <>
            <Text style={styles.coord}>
              📍 Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
            </Text>
            <Text style={styles.addr}>🏠 {address}</Text>
          </>
        )}
      </View>
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
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  heading: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
  },
  coord: {
    fontSize: 18,
    color: '#e9edc9',
    marginBottom: 10,
    textAlign: 'center',
  },
  addr: {
    fontSize: 18,
    color: '#e9edc9',
    textAlign: 'center',
  },
});
