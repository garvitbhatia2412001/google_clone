import {useCallback, useState} from 'react';
import {SCREEN_NAMES} from 'src/constants/screenNames';
import {useAppNavigation} from 'src/navigation/hooks';
import {recentSearches} from './helper/parser';

const useSearchLogic = () => {
  const {goBack, navigate} = useAppNavigation();
  const [searchValue, setSearchValue] = useState('');

  const onPressChevron = useCallback(() => {
    goBack();
  }, [goBack]);

  const onPressCamera = useCallback(() => {
    navigate(SCREEN_NAMES.CAMERA_SCREEN);
  }, [navigate]);

  const onPressMic = useCallback(() => {
    navigate(SCREEN_NAMES.VOICE_RECOGNITIONS_SCREEN);
  }, [navigate]);

  const onPressDone = useCallback(() => {
    if (searchValue) {
      navigate(SCREEN_NAMES.SEARCH_RESULT_SCREEN, {searchText: searchValue});
    }
  }, [navigate, searchValue]);

  return {
    state: {
      recentSearches: recentSearches,
      searchValue,
    },
    callback: {
      onPressChevron,
      onPressCamera,
      onPressMic,
      setSearchValue,
      onPressDone,
    },
  };
};

export default useSearchLogic;
