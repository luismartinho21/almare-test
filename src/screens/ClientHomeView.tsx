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

export const ClientHomeView: React.FC<ClientHomeViewProps> = ({ onSelectBranch }) => {
  // Fade in animation for the two buttons
  const buttonsFadeAnim = useRef(new Animated.Value(0)).current;

  // Beauty card rotate-left animation on tap
  const beautyRotateAnim = useRef(new Animated.Value(0)).current;
  const beautyOpacityAnim = useRef(new Animated.Value(1)).current;

  // Barber card rotate-right animation on tap
  const barberRotateAnim = useRef(new Animated.Value(0)).current;
  const barberOpacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in dos botões logo ao entrar na página inicial
    Animated.timing(buttonsFadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [buttonsFadeAnim]);

  const handleBeautyPress = () => {
    Animated.parallel([
      Animated.timing(beautyRotateAnim, {
        toValue: 1,
        duration: 380,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(beautyOpacityAnim, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start(() => {
      beautyRotateAnim.setValue(0);
      beautyOpacityAnim.setValue(1);
      onSelectBranch('beauty');
    });
  };

  const handleBarberPress = () => {
    Animated.parallel([
      Animated.timing(barberRotateAnim, {
        toValue: 1,
        duration: 380,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(barberOpacityAnim, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start(() => {
      barberRotateAnim.setValue(0);
      barberOpacityAnim.setValue(1);
      onSelectBranch('barber');
    });
  };

  const beautyRotateY = beautyRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });

  const barberRotateY = barberRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.homeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D11" />

      <Animated.View style={[styles.cardsRow, { opacity: buttonsFadeAnim }]}>
        {/* BEAUTY — ESQUERDA (Branco e Dourado) com rotação para a esquerda */}
        <Animated.View
          style={[
            styles.beautyCardWrapper,
            {
              opacity: beautyOpacityAnim,
              transform: [{ perspective: 800 }, { rotateY: beautyRotateY }],
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

        {/* Separador vertical dourado */}
        <View style={styles.verticalDivider} />

        {/* BARBER — DIREITA (Preto e Dourado) com animação de rotação */}
        <Animated.View
          style={[
            styles.barberCardWrapper,
            {
              opacity: barberOpacityAnim,
              transform: [{ perspective: 800 }, { rotateY: barberRotateY }],
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
  /* BEAUTY wrapper para rotação */
  beautyCardWrapper: {
    flex: 1,
  },
  /* BEAUTY — esquerda: fundo branco */
  beautyCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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

  /* Separador vertical dourado */
  verticalDivider: {
    width: 1,
    backgroundColor: Theme.colors.brandSecondary,
    opacity: 0.5,
  },

  /* BARBER wrapper para rotação */
  barberCardWrapper: {
    flex: 1,
  },

  /* BARBER — direita: fundo preto */
  barberCard: {
    flex: 1,
    backgroundColor: '#0D0D11',
    alignItems: 'center',
    justifyContent: 'center',
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
