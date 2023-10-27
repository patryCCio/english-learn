import { useContext, useEffect, useState } from "react";
import TrashPS from "../../assets/svg/TrashPS";
import { getData } from "../../redux/callsApi";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import { changeSettings, deleteDataInfoById, editNameDataInfo } from "../../redux/functions";
import AddItemThree from "./AddItemThree";
import AddItemOpposite from "./AddItemOpposite";
import AddItemNormal from "./AddItemNormal";
import AddItemTwo from "./AddItemTwo";

const SingleCatalogEdit = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchId, setSearchId] = useState(null);
    const location = useLocation();

    const { currentUser } = useContext(AuthContext);
    const { dataInfo, dataTeach } = useSelector(state => state.allTests);
    const [nameInputState, setNameInputState] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [change, setChange] = useState(false);
    const dispatch = useDispatch();

    const [state, setState] =
        useState(dataInfo[Number(location.pathname.split("/")[3])].state);
    const [fill, setFill] =
        useState(dataInfo[Number(location.pathname.split("/")[3])].fill);


    useEffect(() => {
        const getTests = async () => {
            await getData(currentUser.accessToken, "/tests/getTests", dispatch);
            setIsLoading(false);
        }

        if (dataInfo.length > searchId) {
            setIsLoading(false);
            if (searchId !== null) {
                setNameInput(dataInfo[searchId].name);
            }
        } else {
            getTests();
        }

    }, [currentUser.accessToken, dataInfo, dispatch, searchId])

    useEffect(() => {
        setSearchId(location.pathname.split('/')[3]);
    }, [location.pathname])

    useEffect(() => {

        if (change) {
            const options = {
                state,
                fill
            }

            changeSettings(currentUser.accessToken, dataInfo, searchId, options, "/tests/catalog/updateOptions", dispatch);
            setChange(false);
        }

    }, [fill, state])

    const handleDelete = (el) => {

        deleteDataInfoById(dataInfo, "/tests/item/delete", searchId, el, dispatch);
    }

    const handleChangeName = (e) => {
        setNameInput(e.target.value);
    }

    const handleEditName = () => {
        setNameInputState(false);
        editNameDataInfo(currentUser.accessToken, "/tests/catalog/editName", dataInfo, searchId, nameInput, dispatch);
    }

    const handleChangeSelect = (type, e) => {
        if (type === "fill") {
            setFill(e.target.value);
        } else {
            setState(e.target.value);
        }


        setChange(true);
    }


    if (isLoading) {
        return null;
    }

    return (
        <section>
            <div className="content-top">
                {nameInputState ?
                    <>
                        <input type="text" onChange={handleChangeName} value={nameInput} />
                        <button className="button-contents small" onClick={handleEditName}>Ok</button>
                    </>
                    :
                    <h2>{dataInfo[searchId].name}</h2>
                }

                {!nameInputState &&
                    <p className="content-top-p" style={{ cursor: "pointer" }} onClick={() => setNameInputState((prevState) => !prevState)}>| Edit</p>
                }



                <NavLink className="button-contents small" to={`/catalogs`}>Catalogs</NavLink>

                <NavLink className="button-contents small" to={`/catalogs/${searchId}`}>Catalog</NavLink>

                <div className="input-box">
                    <h4>Fill</h4>
                    <select value={fill} onChange={e => handleChangeSelect("fill", e)} className="select-contents">
                        <option value="fill">Fill</option>
                        <option value="no-fill">No fill</option>
                    </select>
                </div>

                <div className="input-box">
                    <h4>State</h4>
                    <select value={state} onChange={e => handleChangeSelect("state", e)} className="select-contents">
                        <option value="static">Static</option>
                        <option value="dynamic">Dynamic</option>
                    </select>
                </div>
            </div>
            <div className="words">
                <div className="word-heading">
                    <h3>Id</h3>
                    <h3>Polish</h3>
                    <h3>Polish opposite</h3>
                    <h3>English</h3>
                    <h3>English 2</h3>
                    <h3>English 3</h3>
                    <h3>English Opposite</h3>
                    <h3>Functions</h3>
                </div>
                {dataInfo[searchId].data.map((el, index) => {
                    return (
                        <div key={index} className="word-body">
                            <div className="word-content">
                                <p>
                                    {index + 1}
                                </p>
                                <p>
                                    {el.pl}
                                </p>
                                {el.plopposite === "" ?
                                    <p className="p-empty">
                                        None!
                                    </p>
                                    :
                                    <p>
                                        {el.plopposite}
                                    </p>
                                }
                                <p>
                                    {el.en}
                                </p>
                                {el.en2 === "" ?
                                    <p className="p-empty">
                                        None!
                                    </p>
                                    :
                                    <p>
                                        {el.en2}
                                    </p>
                                }
                                {el.en3 === "" ?
                                    <p className="p-empty">
                                        None!
                                    </p>
                                    :
                                    <p>
                                        {el.en3}
                                    </p>
                                }

                                {el.enopposite === "" ?
                                    <p className="p-empty">
                                        None!
                                    </p>
                                    :
                                    <p>
                                        {el.enopposite}
                                    </p>
                                }

                                <div className="word-functions">
                                    {
                                        dataInfo[searchId].data.length > 1 &&
                                        <span onClick={() => handleDelete(el)}>
                                            <TrashPS className="trash-svg" />
                                        </span>
                                    }
                                </div>

                            </div>

                        </div>
                    )
                })}
                {dataInfo[searchId].data[0].type === "normal" && <AddItemNormal searchId={searchId} />}
                {dataInfo[searchId].data[0].type === "opposite" && <AddItemOpposite searchId={searchId} />}
                {dataInfo[searchId].data[0].type === "two" && <AddItemTwo searchId={searchId} />}
                {dataInfo[searchId].data[0].type === "three" && <AddItemThree searchId={searchId} />}
            </div>

        </section>
    );
}

export default SingleCatalogEdit;