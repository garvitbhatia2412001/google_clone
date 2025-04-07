import {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import Voice from '@wdragon/react-native-voice';
import locale from 'src/adapters/localeAdapter';
import {useAppDispatch} from 'src/redux/hooks';
import {imageToText} from 'src/redux/thunk/camera';
import {useAppNavigation} from 'src/navigation/hooks';
import {SCREEN_NAMES} from 'src/constants/screenNames';

const useVoiceRecognitionLogic = () => {
  const dispatch = useAppDispatch();
  const {navigate} = useAppNavigation();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const goToResultScreen = useCallback(
    async (data: any) => {
      const searchText: any = await dispatch(imageToText(data));
      if (searchText) {
        navigate(SCREEN_NAMES.SEARCH_RESULT_SCREEN, {searchText});
      }
    },
    [dispatch, navigate],
  );

  useEffect(() => {
    if (!Voice) {
      console.error(locale.VOICE_MODULE_NOT_INITIALIZED);
      return;
    }

    Voice.onSpeechStart = () => {
      setListening(true);
    };

    Voice.onSpeechEnd = () => {
      setListening(false);
      setTimeout(() => {
        if (!listening) startListening();
      }, 500);
    };

    Voice.onSpeechResults = event => {
      if (event.value && event.value.length > 0) {
        const latestSpeech = event.value[0];
        setTranscript(latestSpeech);
        goToResultScreen(latestSpeech);
      }
    };

    Voice.onSpeechError = error => {
      console.warn(locale.SPEECH_RECOGNITION_ERROR, error);
      setListening(false);
      setTimeout(() => {
        if (!listening) startListening();
      }, 1000);
    };

    const init = async () => {
      const granted = await requestPermission();
      if (granted) {
        startListening();
      } else {
        Alert.alert(
          locale.PERMISSION_DENIED,
          locale.ENABLE_MICROPHONE_PERMISSION,
        );
      }
    };
    init();
  }, []);

  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setListening(true);
    } catch (e) {
      console.error(locale.VOICE_START_ERROR, e);
    }
  };

  return {
    listening,
    transcript,
    startListening,
  };
};

export default useVoiceRecognitionLogic;
