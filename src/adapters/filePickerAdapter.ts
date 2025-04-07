import {Alert, Linking} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import {IS_IOS} from 'src/utilities/displayUtils';
import locale from './localeAdapter';

enum StyleType {
  CANCEL = 'cancel',
}

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export type File = {
  name: string | null | undefined;
  size: number | null | undefined;
  type: string | null | undefined;
  uri: string | undefined;
  base64?: string | null | undefined;
};

export type PickerResponse = {
  permissionDenied?: boolean;
  isCancelled?: boolean;
  files?: File[];
};

const getMediaType = (type: FileType): MediaType => {
  switch (type) {
    case FileType.VIDEO:
      return 'video';
    case FileType.IMAGE:
      return 'photo';
    default:
      return 'mixed';
  }
};

const handlePermission = async (permission: Permission): Promise<boolean> => {
  const result = await check(permission);
  switch (result) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.DENIED:
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    case RESULTS.BLOCKED:
      Alert.alert(locale.PERMISSION_BLOCKED, locale.ENABLE_IT_IN_SETTINGS, [
        {text: locale.CANCEL_CAPITALISE, style: StyleType.CANCEL},
        {
          text: locale.OPEN_SETTINGS,
          onPress: () => Linking.openSettings(),
        },
      ]);
      return false;
    default:
      return false;
  }
};

const pickFromGallery = async (
  mediaType: FileType = FileType.IMAGE,
  multiSelect: boolean = false,
): Promise<PickerResponse> => {
  const result = await launchImageLibrary({
    mediaType: getMediaType(mediaType),
    selectionLimit: multiSelect ? 0 : 1,
    includeBase64: false,
  });

  if (result.didCancel) {
    return {isCancelled: true};
  }

  return {
    files: result.assets?.map(asset => ({
      name: asset.fileName,
      size: asset.fileSize,
      type: asset.type,
      uri: asset.uri,
    })),
  };
};

const pickFromCamera = async (
  mediaType: FileType = FileType.IMAGE,
): Promise<PickerResponse> => {
  const permission = IS_IOS
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;

  const isPermissionGranted = await handlePermission(permission);
  if (!isPermissionGranted) {
    return {permissionDenied: true};
  }

  const result = await launchCamera({
    mediaType: getMediaType(mediaType),
  });

  if (result.didCancel) {
    return {isCancelled: true};
  }

  return {
    files: result.assets?.map(asset => ({
      name: asset.fileName,
      size: asset.fileSize,
      type: asset.type,
      uri: asset.uri,
    })),
  };
};

const FilePickerAdapter = {
  pickFromGallery,
  pickFromCamera,
};

export default FilePickerAdapter;
