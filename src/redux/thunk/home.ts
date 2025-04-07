import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../store';
import {fetchHomeData as fetchHomeDataService} from 'src/services/home';
import {setHomeData} from '../slices/home/homeSlice';

type Action = ThunkAction<void, RootState, unknown, AnyAction>;

const fetchHomeData = (): Action => async dispatch => {
  const response = await fetchHomeDataService();
  if (!response.success) {
    return false;
  }
  dispatch(setHomeData(response.data));
};

export {fetchHomeData};
