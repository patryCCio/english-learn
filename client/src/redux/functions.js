import axios from "axios";
import { addDataTeach, deleteDataTeach, getError, setDataInfo } from "./callsSlice";
import jwtDecode from "jwt-decode";


export const addDataTeachAllF = (el, dataTeach, dispatch) => {
    let array = [];

    for (let x = 0; x < el.data.length; x++) {
        let state = false;
        for (let y = 0; y < dataTeach.length; y++) {
            if (el.data[x].id === dataTeach[y].id) {
                state = true;
            }
        }

        if (!state) {
            array.push(el.data[x]);
        }
    }
    dispatch(addDataTeach(array));
}

export const addDataTeachById = (el, dataTeach, dispatch) => {
    let state = false;

    dataTeach.forEach((el2) => {
        if (el2.id === el.id) {
            state = true;
        }
    })

    if (!state) {
        dispatch(addDataTeach([el]));
    }
}

export const deleteDataTeachById = (id, dataTeach, dispatch) => {

    let array = dataTeach;

    array = array.filter((el2) => {
        if (el2.id !== id) {
            return el2;
        }
    });

    dispatch(deleteDataTeach(array));
}

export const deleteDataTeachAll = (el, dataTeach, dispatch) => {
    let array = dataTeach;

    array = array.filter((el2) => {
        if (el2.name !== el.name) {
            return el2;
        }
    })

    dispatch(deleteDataTeach(array));
}

export const deleteDataInfoById = async (dataInfo, url, searchId, elI, dispatch) => {
    let array = [];

    const idEl = elI.id;
    const userId = elI.userId;

    try {

        const res = await axios.post(`${import.meta.env.VITE_API_URL + url}`, { id: idEl, userId }, { withCredentials: true })

        array = dataInfo.map((element, index) => {
            if (index == searchId) {
                let arrayHelper = [];
                arrayHelper = element.data.filter((el) => {
                    if (el.id !== idEl) {
                        return el;
                    }
                })
                return {
                    ...element,
                    data: arrayHelper
                };
            } else return element;
        })
        dispatch(setDataInfo(array));

    } catch (error) {
        dispatch(getError());
    }



}

export const editNameDataInfo = async (accessToken, url, dataInfo, searchId, nameInput, dispatch) => {
    let array = [];

    if (nameInput.length < 3) return null;

    let state = false;

    dataInfo.forEach(el => {
        if (el.name === nameInput) {
            state = true;
        }
    })

    if (state) return null;

    array = dataInfo.map((element, index) => {
        if (index == searchId) {
            let arrayHelper = [];
            arrayHelper = element.data.map((el) => {
                return {
                    ...el,
                    name: nameInput
                }
            })
            return { name: nameInput, data: arrayHelper };
        }
        else return element;
    })

    const user = await jwtDecode(accessToken);
    const oldName = dataInfo[searchId].name;

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL + url}`, { newName: nameInput, oldName, userId: user.id }, { withCredentials: true })
        dispatch(setDataInfo(array));
    } catch (error) {
        dispatch(getError());
    }
}

export const addNewCatalog = async (accessToken, url, dataInfo, obj, dispatch) => {
    const user = await jwtDecode(accessToken);

    let array = [];

    array = obj.data.map(el => {

        return [
            user.id,
            el.name,
            el.fill,
            el.state,
            el.type,
            el.pl,
            el.en,
            el.en2,
            el.en3,
            el.plopposite,
            el.enopposite,
        ]
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL + url}`, { array }, { withCredentials: true })


        let dataToPush = obj.data.map((el, index) => {
            return {
                id: res.data + index,
                userId: user.id,
                name: el.name,
                fill: el.fill,
                state: el.state,
                type: el.type,
                pl: el.pl,
                en: el.en,
                en2: el.en2,
                en3: el.en3,
                plopposite: el.plopposite,
                enopposite: el.enopposite,
            }

        })

        const objectToPush = {
            id: dataInfo.length,
            name: obj.name,
            state: obj.state,
            fill: obj.fill,
            type: obj.type,
            data: dataToPush
        }

        const arrayToSet = await dataInfo.map(el => el);
        arrayToSet.push(objectToPush);

        dispatch(setDataInfo(arrayToSet));
    } catch (error) {
        dispatch(getError());
    }
}

export const addElementDataInfo = async (dataInfo, url, searchId, inputs, dispatch) => {
    let array = [];

    let userId = dataInfo[searchId].data[0].userId;
    let name = dataInfo[searchId].data[0].name;
    let type = dataInfo[searchId].data[0].type;
    let fill = dataInfo[searchId].data[0].fill;
    let state = dataInfo[searchId].data[0].state;


    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL + url}`, { userId, name, state, fill, type, object: inputs }, { withCredentials: true })

        const obj = {
            id: res.data,
            userId: userId,
            name: name,
            state: state,
            fill: fill,
            type: type,
            ...inputs
        }

        let dataHelper = dataInfo[searchId].data;
        dataHelper = [...dataHelper, obj];

        array = dataInfo.map((el, index) => {
            if (index == searchId) {
                return {
                    ...el,
                    data: dataHelper
                }
            } else return el;
        })

        dispatch(setDataInfo(array));
    } catch (error) {
        dispatch(getError());
    }

}

export const changeSettings = async (accessToken, dataInfo, searchId, options, url, dispatch) => {
    const user = await jwtDecode(accessToken);
    console.log(options);

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL + url}`, { userId: user.id, name: dataInfo[searchId].name, options }, { withCredentials: true })

        let array = [];

        array = await dataInfo.map((element, index) => {
            if (index == searchId) {

                let data = element.data.map((el) => ({
                    ...el,
                    fill: options.fill,
                    type: options.type
                }))

                const obj = {
                    name: element.name,
                    fill: options.fill,
                    state: options.state,
                    type: element.type,
                    data
                }

                return obj;
            } else return element;
        });
        dispatch(setDataInfo(array));
    } catch (error) {
        dispatch(getError());
    }
}