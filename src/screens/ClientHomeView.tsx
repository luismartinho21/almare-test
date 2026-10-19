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
  // Fade in de entrada dos 2 botões
  const buttonsFadeAnim = useRef(new Animated.Value(0)).current;

  // Valor de animação de 0 a 1 para o efeito livro
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

  // BEAUTY (Esquerda): Folheia a página para fora/esquerda
  const handleBeautyPress = () => {
    Animated.timing(beautyBookAnim, {
      toValue: 1,
      duration: 850,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      onSelectBranch('beauty');
    });
  };

  // BARBER (Direita): Folheia a página para fora/direita
  const handleBarberPress = () => {
    Animated.timing(barberBookAnim, {
      toValue: 1,
      duration: 850,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      onSelectBranch('barber');
    });
  };

  // BEAUTY INTERPOLATIONS
  const beautyRotateY = beautyBookAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-85deg'],
  });

  const beautyTranslateX = beautyBookAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -halfWidth * 0.45],
  });

  const beautyOpacity = beautyBookAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 0.7, 0],
  });

  // BARBER INTERPOLATIONS
  const barberRotateY = barberBookAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '85deg'],
  });

  const barberTranslateX = barberBookAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, halfWidth * 0.45],
  });

  const barberOpacity = barberBookAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 0.7, 0],
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
                { perspective: 1000 },
                { translateX: beautyTranslateX },
                { rotateY: beautyRotateY },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.beautyCard}
            onPress={handleBeautyPress}
            activeOpacity={0.85}
          >
            <Text style={styles.beautyTitle}>ALMARE</Text>
            <Text style={styles.beautySubtitle}>BEAUTY</Text>
            <View style={styles.beautyLine} />
          </TouchableOpacity>
        </Animated.View>

        {/* Lombada central dourada do livro */}
        <View style={styles.spineDivider} />

        {/* BARBER — DIREITA (Preto e Dourado) */}
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              backgroundColor: '#1E1E28', // Fundo de contraste para a rotação 3D ser 100% visível sobre o preto
              opacity: barberOpacity,
              transform: [
                { perspective: 1000 },
                { translateX: barberTranslateX },
                { rotateY: barberRotateY },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.barberCard}
            onPress={handleBarberPress}
            activeOpacity={0.85}
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
    borderRightWidth: 0.5,
    borderRightColor: '#E2E8F0',
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
    width: 2,
    backgroundColor: Theme.colors.brandSecondary,
    opacity: 0.7,
  },

  /* BARBER — direita: fundo carvão/preto premium */
  barberCard: {
    flex: 1,
    backgroundColor: '#111116',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#272733',
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
