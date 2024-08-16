import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export default function App() {

  const titleY = useSharedValue(-100); 
  const backgroundColor = useSharedValue('blue'); 
  const titleOpacity = useSharedValue(1); 

  // Efecto para animar el título al cargar la pantalla
  useEffect(() => {
    titleY.value = withTiming(0, { duration: 1000 }); 
  }, []);


  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titleY.value }],
      opacity: titleOpacity.value,
    };
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

//boton iniciar
  const handleStart = () => {
    // Animaciones cuando se presiona el botón
    backgroundColor.value = withTiming('purple', { duration: 1000 }); 
    titleOpacity.value = withTiming(0, { duration: 1000 }); 
  };

  return (
    <Animated.View style={[styles.container, animatedBackgroundStyle]}>
      <Animated.View style={[styles.titleContainer, animatedTitleStyle]}>
        <Text style={styles.title}>¡Bienvenido!</Text>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: height * 0.3,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
  },
});
