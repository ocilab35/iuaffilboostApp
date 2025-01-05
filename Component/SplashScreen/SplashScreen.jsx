// SplashScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Text } from 'react-native-svg';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignUp');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logog.png')}
        style={{
          width: '75%',
          height: '25%',
          backgroundColor: '#F5ECE0',
          marginTop: 250
        }}
      />
      <Svg height="150" width="300">
        <Text
          fill="white"
          stroke="#800080"
          strokeWidth="2"
          fontSize="45"
          x="50%"
          y="30%"
          textAnchor="middle"
          fontFamily="serif"
        >
          UBSMEUBLES
        </Text>
        <Text
          fill="white"
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth="1"
          fontSize="45"
          x="50%"
          y="30%"
          textAnchor="middle"
          fontFamily="serif"
        >
          UBSMEUBLES
        </Text>
        <Text
          fill="#000000"
          fontSize="18"
          x="50%"
          y="70%"
          dy="-20"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          FOURNISSEUR DE MOBILIER
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece2d9',
    alignItems: 'center'
  }
});

export default SplashScreen;
