import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SalonBranch } from '../types';
import { Theme } from '../constants/theme';

interface ClientHomeViewProps {
  onSelectBranch: (branch: SalonBranch) => void;
}

const { width } = Dimensions.get('window');
const halfWidth = width / 2;

export const ClientHomeView: React.FC<ClientHomeViewProps> = ({ onSelectBranch }) => {
  // Fade in suave dos botões na entrada
  const buttonsFadeAnim = useRef(new Animated.Value(0)).current;

  // Animação efeito folhear livro:
  // 0 = fechado / posição normal
  // 1 = folha aberta a 90 graus (abertura completa do livro)
  const beautyBookAnim = useRef(new Animated.Value(0)).current;
  const barberBookAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(buttonsFadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [buttonsFadeAnim]);

  // BEAUTY: Folheia para a esquerda como a capa/página esquerda de um livro (eixo na lombada central)
  const handleBeautyPress = () => {
    Animated.timing(beautyBookAnim, {
      toValue: 1,
      duration: 850,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      beautyBookAnim.setValue(0);
      onSelectBranch('beauty');
    });
  };

  // BARBER: Folheia para a direita como a página direita de um livro (eixo na lombada central)
  const handleBarberPress = () => {
    Animated.timing(barberBookAnim, {
      toValue: 1,
      duration: 850,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      barberBookAnim.setValue(0);
      onSelectBranch('barber');
    });
  };

  // Interpolações de rotação 3D com abertura realista de livro
  const beautyRotateY = beautyBookAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-88deg'],
  });

  const beautyTranslateX = beautyBookAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -halfWidth * 0.4],
  });

  const beautyOpacity = beautyBookAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 0.8, 0],
  });

  const barberRotateY = barberBookAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '88deg'],
  });

  const barberTranslateX = barberBookAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, halfWidth * 0.4],
  });

  const barberOpacity = barberBookAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 0.8, 0],
  });

  return (
    <View style={styles.homeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D11" />

      <Animated.View style={[styles.cardsRow, { opacity: buttonsFadeAnim }]}>
        {/* BEAUTY — ESQUERDA (Branco e Dourado) */}
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              opacity: beautyOpacity,
              transform: [
                { perspective: 1200 },
                { translateX: beautyTranslateX },
                { rotateY: beautyRotateY },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.beautyCard}
            onPress={handleBeautyPress}
            activeOpacity={0.9}
          >
            <Text style={styles.beautyTitle}>ALMARE</Text>
            <Text style={styles.beautySubtitle}>BEAUTY</Text>
            <View style={styles.beautyLine} />
          </TouchableOpacity>
        </Animated.View>

        {/* Lombada central do livro (separador dourado com brilho subtil) */}
        <View style={styles.spineDivider} />

        {/* BARBER — DIREITA (Preto e Dourado) */}
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              opacity: barberOpacity,
              transform: [
                { perspective: 1200 },
                { translateX: barberTranslateX },
                { rotateY: barberRotateY },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.barberCard}
            onPress={handleBarberPress}
            activeOpacity={0.9}
          >
            <Text style={styles.barberTitle}>ALMARE</Text>
            <Text style={styles.barberSubtitle}>BARBER</Text>
            <View style={styles.barberLine} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#0D0D11',
  },
  cardsRow: {
    flex: 1,
    flexDirection: 'row',
  },
  cardWrapper: {
    flex: 1,
    height: '100%',
  },
  /* BEAUTY — esquerda: fundo branco */
  beautyCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  beautyTitle: {
    color: '#B8860B',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 5,
  },
  beautySubtitle: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 8,
    marginTop: 2,
  },
  beautyLine: {
    marginTop: 14,
    width: 32,
    height: 1.5,
    backgroundColor: '#B8860B',
  },

  /* Lombada central do livro */
  spineDivider: {
    width: 1.5,
    backgroundColor: Theme.colors.brandSecondary,
    opacity: 0.45,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },

  /* BARBER — direita: fundo preto */
  barberCard: {
    flex: 1,
    backgroundColor: '#0D0D11',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  barberTitle: {
    color: '#D4AF37',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 5,
  },
  barberSubtitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 8,
    marginTop: 2,
  },
  barberLine: {
    marginTop: 14,
    width: 32,
    height: 1.5,
    backgroundColor: '#D4AF37',
  },
});
