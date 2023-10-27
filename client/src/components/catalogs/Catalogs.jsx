import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteCatalog, getData } from "../../redux/callsApi";
import { NavLink, useNavigate } from "react-router-dom";
import EyePS from "../../assets/svg/EyePS";
import { addDataTeachAllF, deleteDataTeachAll } from "../../redux/functions";


const Catalogs = () => {
    const { currentUser } = useContext(AuthContext);
    const [usage, setUsage] = useState(null);
    const { dataInfo, dataTeach } = useSelector(state => state.allTests);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (usage !== null) {
            setIsLoading(false);
        }
    }, [usage])

    const handleTeach = () => {
        let array = [];
        dataInfo.forEach(data => {
            let number = 0;
            data.data.forEach(el => {
                dataTeach.forEach(el2 => {
                    if (el.name === el2.name && el.pl === el2.pl) {
                        number++;
                    }
                })
            })
            array.push(number);
        })

        setUsage(array);
    }


    useEffect(() => {
        console.log('dataTeach', dataTeach);
        handleTeach();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataTeach])

    useEffect(() => {
        handleTeach();
        console.log('dataInfo', dataInfo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataInfo])

    useEffect(() => {

        const getTests = async () => {
            await getData(currentUser.accessToken, "/tests/getTests", dispatch);
        }

        if (dataInfo.length === 0) {
            getTests();
        } else {
            handleTeach();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getBooleanIsFull = (el, index) => {

        if (usage[index] / el.data.length === 1) {
            return true;
        }

        return false;
    }

    const getPercent = (el, index) => {
        return usage[index] / el.data.length * 100;
    }

    const handleClickEdit = (el, index) => {
        deleteDataTeachAll(el, dataTeach, dispatch);
        navigation(`/catalogs/edit/${index}`);
    }

    const handleClickAdd = (el) => {
        addDataTeachAllF(el, dataTeach, dispatch);
    }

    const handleClickDelete = (el) => {
        deleteDataTeachAll(el, dataTeach, dispatch);
    }

    const handleDeleteCatalog = (el, index) => {
        deleteDataTeachAll(el, dataTeach, dispatch);
        deleteCatalog(index, dataInfo, currentUser.accessToken, "/tests/catalog/delete", dispatch);
    }

    if (isLoading) return null;

    return (
        <section>
            <div className="catalogs-top">
                <h2 style={{ textAlign: "center" }}>Catalogs ({dataInfo.length})</h2>
            </div>
            <div className="catalogs-bottom">

                {dataInfo.map((el, index) => {
                    return (
                        <div key={index} className="catalog">
                            <div className="names">
                                <div className="names-left">
                                    <h3>{el.name}</h3>
                                    <p>&nbsp;({el.data.length})</p>
                                </div>
                                <NavLink to={`/catalogs/${index}`}><EyePS className="eye-svg" /></NavLink>
                            </div>
                            <hr />
                            <div className="catalog-content">
                                <div className="catalog-el">
                                    <p>Type:</p>

                                    <p className="el-p" style={{
                                        color: getBooleanIsFull(el, index) ? "rgb(29, 153, 29)" : "tomato"
                                    }}>&nbsp;{el.type.toUpperCase()}</p>
                                </div>
                                <div className="catalog-el">
                                    <p>State:</p>
                                    <p className="el-p" style={{
                                        color: getBooleanIsFull(el, index) ? "rgb(29, 153, 29)" : "tomato"
                                    }}>&nbsp;{el.state.toUpperCase()}</p>
                                </div>
                                <div className="catalog-el">
                                    <p>Fill:</p>
                                    <p className="el-p" style={{
                                        color: getBooleanIsFull(el, index) ? "rgb(29, 153, 29)" : "tomato"
                                    }}>&nbsp;{el.fill.toUpperCase()}</p>
                                </div>
                                <div className="catalog-el">
                                    <p>Elements used for teach:</p>
                                    <p className="el-p" style={{
                                        color: getBooleanIsFull(el, index) ? "rgb(29, 153, 29)" : "tomato"
                                    }}>&nbsp;{getBooleanIsFull(el, index) ? "All" : usage[index]}</p>
                                </div>

                                <div className="catalog-progress">
                                    <span style={{
                                        width: `${getPercent(el, index)}%`,
                                        backgroundColor: getBooleanIsFull(el, index) ? "rgb(29, 153, 29)" : "tomato"
                                    }} />
                                </div>
                            </div>
                            <hr />
                            <div className="catalog-edit">
                                {
                                    getBooleanIsFull(el, index) ?
                                        <button onClick={() => handleClickDelete(el, index)} className="button-contents small remove">Remove all from teach</button>
                                        :
                                        <button onClick={() => handleClickAdd(el, index)} className="button-contents small add">Add all to teach</button>
                                }

                                <button onClick={() => handleClickEdit(el, index)} className="button-contents small edit">Edit</button>
                                <button onClick={() => handleDeleteCatalog(el, index)} className="button-contents small delete">Delete catalog</button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </section>
    );
}

export default Catalogs;