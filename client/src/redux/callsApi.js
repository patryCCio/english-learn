import axios from "axios";
import { deleteDataInfo, getError, getStart, getSuccess } from "./callsSlice";
import jwtDecode from "jwt-decode";

export const getData = async (accessToken, url, dispatch) => {
    dispatch(getStart());
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL + url}`, { accessToken })
        const datas = res.data;

        dispatch(getSuccess(datas));
    } catch (err) {
        dispatch(getError());
    }
}

export const deleteCatalog = async (id, dataInfo, accessToken, url, dispatch) => {

    const user = await jwtDecode(accessToken);

    const name = dataInfo[id].name;
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL + url}`, { name, userId: user.id }, { withCredentials: true })

        let array = [];
        array = dataInfo.filter((el, index) => {
            if (index !== id) {
                return el;
            }
        })
        dispatch(deleteDataInfo(array));
    } catch (error) {
        dispatch(getError());
    }




}

