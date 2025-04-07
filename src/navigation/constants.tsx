import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_NAMES} from 'src/constants/screenNames';
import CameraScreen from 'src/presentation/screens/CameraScreen';
import HomeScreen from 'src/presentation/screens/HomeScreen';
import SearchResultScreen from 'src/presentation/screens/SearchResultScreen';
import SearchScreen from 'src/presentation/screens/SearchScreen';
import VoiceRecognitionScreen from 'src/presentation/screens/VoiceRecognitionScreen';
import BottomTabNavigation from './BottomTabNavigation';

const styles = {
  selectedTabBackground: {
    backgroundColor: '#5A5D7A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
};

export const ROUTES = {
  [SCREEN_NAMES.BOTTOM_TABS]: {
    component: BottomTabNavigation,
    options: {headerShown: false, gestureEnabled: true},
  },
  [SCREEN_NAMES.SEARCH_SCREEN]: {
    component: SearchScreen,
    options: {headerShown: false, gestureEnabled: true},
  },
  [SCREEN_NAMES.CAMERA_SCREEN]: {
    component: CameraScreen,
    options: {headerShown: false, gestureEnabled: true},
  },
  [SCREEN_NAMES.VOICE_RECOGNITIONS_SCREEN]: {
    component: VoiceRecognitionScreen,
    options: {headerShown: false, gestureEnabled: true},
  },
  [SCREEN_NAMES.SEARCH_RESULT_SCREEN]: {
    component: SearchResultScreen,
    options: {headerShown: false, gestureEnabled: true},
  },
};

export const TAB_ROUTES = {
  [SCREEN_NAMES.HOME_SCREEN]: {
    component: HomeScreen,
    tabName: '',
    selectedIcon: (color: string) => (
      <View style={styles.selectedTabBackground}>
        <MaterialCommunityIcons name="home" color={color} size={24} />
      </View>
    ),
    deselectedIcon: (color: string) => (
      <MaterialCommunityIcons name="home" color={color} size={24} />
    ),
  },
  [SCREEN_NAMES.HISTORY_SCREEN]: {
    component: HomeScreen,
    tabName: '',
    selectedIcon: (color: string) => (
      <View style={styles.selectedTabBackground}>
        <MaterialCommunityIcons name="history" color={color} size={24} />
      </View>
    ),
    deselectedIcon: (color: string) => (
      <MaterialCommunityIcons name="history" color={color} size={24} />
    ),
  },
  [SCREEN_NAMES.NOTIFICATION_SCREEN]: {
    component: HomeScreen,
    tabName: '',
    selectedIcon: (color: string) => (
      <View style={styles.selectedTabBackground}>
        <MaterialCommunityIcons name="bell-outline" color={color} size={24} />
      </View>
    ),
    deselectedIcon: (color: string) => (
      <MaterialCommunityIcons name="bell-outline" color={color} size={24} />
    ),
  },
  [SCREEN_NAMES.MENU_SCREEN]: {
    component: HomeScreen,
    tabName: '',
    selectedIcon: (color: string) => (
      <View style={styles.selectedTabBackground}>
        <MaterialCommunityIcons name="menu" color={color} size={24} />
      </View>
    ),
    deselectedIcon: (color: string) => (
      <MaterialCommunityIcons name="menu" color={color} size={24} />
    ),
  },
};
