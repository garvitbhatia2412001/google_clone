import {useCallback, useEffect, useRef, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import FilePickerAdapter from 'src/adapters/filePickerAdapter';
import {SCREEN_NAMES} from 'src/constants/screenNames';
import {useAppNavigation} from 'src/navigation/hooks';
import {useAppDispatch} from 'src/redux/hooks';
import {imageToText} from 'src/redux/thunk/camera';
import {IS_IOS} from 'src/utilities/displayUtils';

const useCameraLogic = () => {
  const dispatch = useAppDispatch();
  const {goBack, navigate} = useAppNavigation();
  const [permission, setPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const requestPermission = async () => {
    if (!IS_IOS) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      const granted = await requestPermission();
      setPermission(granted);
    })();
  }, []);

  const goToResultScreen = useCallback(
    async (data: any) => {
      const searchText: any = await dispatch(imageToText(data));
      if (searchText) {
        navigate(SCREEN_NAMES.SEARCH_RESULT_SCREEN, {searchText});
      }
    },
    [dispatch, navigate],
  );

  const onPressGallery = useCallback(async () => {
    const {files} = await FilePickerAdapter.pickFromGallery();
    const isFileSelected = files && files.length > 0 && files[0].uri;
    if (isFileSelected) {
    }
  }, [goToResultScreen]);

  const onPressCapture = useCallback(async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      if (photo?.path) {
        goToResultScreen(photo);
      }
    }
  }, [goToResultScreen]);

  return {
    state: {
      cameraRef,
      permission,
      device,
    },
    callback: {
      goBack,
      onPressGallery,
      onPressCapture,
    },
  };
};

export default useCameraLogic;
