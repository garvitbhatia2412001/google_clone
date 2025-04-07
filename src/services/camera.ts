import ApiAdapter from 'src/adapters/apiAdapter';
import locale from 'src/adapters/localeAdapter';
import config from 'src/config';
import {Service} from 'src/constants/apiServices';
import {resultData} from 'src/presentation/screens/SearchResultScreen/helper/parser';

const apiAdapter = new ApiAdapter();

const imageToTextService = async (requestBody: any) => {
  const response = await apiAdapter.postRequest(
    Service.SERVICE,
    config.endpoints.imageToText,
    requestBody,
  );
  // Dummy api response
  return {
    data: {
      text: locale.CLOTHES,
    },
    status: 200,
    success: true,
  };
};

const fetchSearchResultsService = async (requestBody: any) => {
  const response = await apiAdapter.postRequest(
    Service.SERVICE,
    config.endpoints.imageToText,
    requestBody,
  );
  // Dummy api response
  return {
    data: resultData,
    status: 200,
    success: true,
  };
};

export {imageToTextService, fetchSearchResultsService};
