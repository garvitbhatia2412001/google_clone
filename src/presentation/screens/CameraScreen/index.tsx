import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {
  default as Icon,
  default as Ionicons,
} from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Camera} from 'react-native-vision-camera';
import locales from 'src/locales/en';
import colors from 'src/theme/colors';
import useCameraLogic from './hooks';

const {width} = Dimensions.get('window');

const CameraScreen = () => {
  const {state, callback} = useCameraLogic();
  const {cameraRef, permission, device} = state;
  const {goBack, onPressGallery, onPressCapture} = callback;

  if (permission !== true && !device) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <View style={styles.topBar}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={35}
          color={colors.white}
          onPress={goBack}
        />
        <Text style={styles.title}>{locales.GOOGLE_LENS}</Text>
        <View style={styles.topRightIcons}>
          <MaterialIcons name="history" size={24} color={colors.white} />
          <MaterialIcons
            name="more-vert"
            size={24}
            color={colors.white}
            style={{marginLeft: 15}}
          />
        </View>
      </View>

      <View style={styles.scanArea}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.captureButtonContainer}>
          <Ionicons
            name="images-outline"
            size={40}
            color={colors.white}
            onPress={onPressGallery}
          />
          <Pressable style={styles.captureButton} onPress={onPressCapture}>
            <Icon name="search" size={28} color={colors.blackBackground} />
          </Pressable>
        </View>
        <View style={styles.optionButtons}>
          {[locales.TRANSLATE, locales.SEARCH, locales.HOMEWORK].map(
            (item, index) => {
              const isSelected = item === locales.SEARCH;
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.bottomButton,
                    isSelected && styles.bottomButtonSelected,
                  ]}>
                  <Text
                    style={[
                      styles.bottomText,
                      isSelected && styles.bottomTextSelected,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;

const overlaySize = width * 0.75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackBackground,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
  scanArea: {
    position: 'absolute',
    top: '25%',
    left: (width - overlaySize) / 2,
    width: overlaySize,
    height: overlaySize,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderColor: colors.white,
    borderTopLeftRadius: 30,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderColor: colors.white,
    borderTopRightRadius: 30,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderColor: colors.white,
    borderBottomLeftRadius: 30,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderColor: colors.white,
    borderBottomRightRadius: 30,
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 110,
    flexDirection: 'row',
    alignItems: 'center',
    left: '15%',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.whiteBackground,
    justifyContent: 'center',
    alignItems: 'center',
    left: '55%',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  bottomButton: {
    backgroundColor: colors.blackBackground,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  bottomText: {
    color: colors.white,
    fontSize: 14,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.blackBackground,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  bottomButtonSelected: {
    backgroundColor: colors.selectedButtonBackground,
  },
  bottomTextSelected: {
    color: colors.selectedButtonText,
    fontWeight: '500',
  },
});
