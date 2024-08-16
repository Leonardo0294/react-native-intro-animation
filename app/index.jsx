import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export default function App() {
  // Valores compartidos para las animaciones
  const titleY = useSharedValue(-100); 
  const backgroundColor = useSharedValue('blue');
  const titleOpacity = useSharedValue(1); 

  // Efecto para animar el título al cargar la pantalla
  React.useEffect(() => {
    titleY.value = withTiming(0, { duration: 1000 }); // Deslizar desde arriba
  }, []);

  // Estilo animado para el título
  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titleY.value }],
      opacity: titleOpacity.value,
    };
  });

  // Estilo para el fondo de pantalla
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  // Evento para el botón Inicar
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
    fontSize: 18,
    color: 'blue',
  },
});
