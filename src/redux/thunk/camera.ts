import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {
  fetchSearchResultsService,
  imageToTextService,
} from 'src/services/camera';
import {RootState} from '../store';

type Action = ThunkAction<void, RootState, unknown, AnyAction>;

const imageToText =
  (request: any): Action =>
  async () => {
    const response = await imageToTextService(request);
    if (!response.success) {
      return false;
    }
    return response?.data?.text;
  };

const fetchSearchResults =
  (request: any): Action =>
  async () => {
    const response = await fetchSearchResultsService(request);
    if (!response.success) {
      return false;
    }
    return response;
  };

export {imageToText, fetchSearchResults};
