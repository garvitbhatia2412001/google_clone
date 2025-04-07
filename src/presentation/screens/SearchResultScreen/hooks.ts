import {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch} from 'src/redux/hooks';
import {Tabs} from './types';
import {fetchSearchResults} from 'src/redux/thunk/camera';
import {useAppNavigation} from 'src/navigation/hooks';

const useSearchResultLogic = (searchText: string) => {
  const dispatch = useAppDispatch();
  const {goBack} = useAppNavigation();
  const [selectedTab, setSelectedTab] = useState(Tabs.ALL);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState<any>([]);

  const selectedTabData = useMemo(() => data[selectedTab], [data, selectedTab]);

  const fetchResults = useCallback(async () => {
    const response: any = await dispatch(fetchSearchResults(searchText));
    if (response?.success) {
      setData(response?.data);
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText) {
      fetchResults();
    }
  }, [searchText]);

  return {
    state: {
      data: selectedTabData || [],
      selectedTab,
      searchValue,
    },
    callback: {
      setSearchValue,
      setSelectedTab,
      goBack,
    },
  };
};

export default useSearchResultLogic;
