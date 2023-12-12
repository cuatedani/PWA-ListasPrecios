import { getInstitutesAll } from './actions/institutesActions';
import { SET_DATA_INSTITUTES } from './slices/institutesSlice';

export const GET_DATA_START = () => {
    return async (dispatch, getState) => {
        dispatch(
            SET_DATA_INSTITUTES(
                await getInstitutesAll(),
            )
        )
    };
};