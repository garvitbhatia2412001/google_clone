import {useCallback, useEffect, useMemo, useState} from 'react';
import {SCREEN_NAMES} from 'src/constants/screenNames';
import {useAppNavigation} from 'src/navigation/hooks';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {RootState} from 'src/redux/store';
import {fetchHomeData} from 'src/redux/thunk/home';
import {HOME_DATA} from './helper/parser';

const useHomeLogic = () => {
  const {navigate} = useAppNavigation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const homeData = useAppSelector((state: RootState) => state.home.data);

  const {
    iconBtnData = [],
    infoCardsData = [],
    newsData = [],
  }: any = useMemo(() => homeData || {}, [homeData]);

  const getHomeData = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchHomeData());
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getHomeData();
  }, [getHomeData]);

  const onPressSearch = useCallback(() => {
    navigate(SCREEN_NAMES.SEARCH_SCREEN);
  }, [navigate]);

  const onPressCamera = useCallback(() => {
    navigate(SCREEN_NAMES.CAMERA_SCREEN);
  }, [navigate]);

  const onPressMic = useCallback(() => {
    navigate(SCREEN_NAMES.VOICE_RECOGNITIONS_SCREEN);
  }, [navigate]);

  return {
    state: {
      isLoading,
      data: HOME_DATA,
      iconBtnData,
      infoCardsData,
      newsData,
    },
    callback: {onPressSearch, onPressCamera, onPressMic},
  };
};

export default useHomeLogic;
