import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface HomeState {
  loading: boolean;
  error: string | null;
  data: {
    icon_buttons: any[];
    infoCardsData: any[];
    newsData: any[];
  } | null;
}

const initialState: HomeState = {
  loading: false,
  error: null,
  data: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeData(state, action: PayloadAction<HomeState['data']>) {
      state.data = action.payload;
    },
  },
});

export const {setHomeData} = homeSlice.actions;

export default homeSlice.reducer;
