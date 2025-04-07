import ApiAdapter from 'src/adapters/apiAdapter';
import config from 'src/config';
import {Service} from 'src/constants/apiServices';
import {homeData} from 'src/presentation/screens/HomeScreen/helper/parser';

const apiAdapter = new ApiAdapter();

const fetchHomeData = async () => {
  const response = await apiAdapter.getRequest(
    Service.SERVICE,
    config.endpoints.home,
  );
  // Dummy api response
  return {
    data: homeData,
    status: 200,
    success: true,
  };
};

export {fetchHomeData};
