import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import colors from 'src/theme/colors';
import locale from 'src/adapters/localeAdapter';
import useVoiceRecognitionLogic from './hooks';

const VoiceRecognitionScreen = () => {
  const {listening, transcript, startListening} = useVoiceRecognitionLogic();
  const dotColors = colors.voiceRecognitionColors;
  const scales = dotColors.map(() => useSharedValue(1));

  const animateDots = () => {
    scales.forEach(scale => {
      scale.value = withRepeat(
        withTiming(1.5, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );
    });
  };

  const renderDots = () => {
    return dotColors.map((color, index) => {
      const style = useAnimatedStyle(() => ({
        transform: [{scale: scales[index].value}],
      }));
      return (
        <Animated.View
          key={index}
          style={[styles.dot, {backgroundColor: color}, style]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.speakNow}>
        {listening ? locale.LISTENING : locale.TAP_TO_SPEAK}
      </Text>
      <View style={styles.dotsContainer}>{renderDots()}</View>

      <Text style={styles.transcript}>{transcript}</Text>

      <Pressable
        style={styles.button}
        onPress={() => {
          startListening();
          animateDots();
        }}>
        <Text style={styles.buttonText}>{locale.TAP_TO_RETRY}</Text>
      </Pressable>
    </View>
  );
};

export default VoiceRecognitionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  speakNow: {
    fontSize: 24,
    color: colors.speakNowTextColor,
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  transcript: {
    fontSize: 18,
    color: '#eee',
    textAlign: 'center',
    marginVertical: 20,
    minHeight: 50,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#888',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
