import { useContext, useEffect, useState } from "react";
import AddPS from "../../assets/svg/AddPS";
import TrashPS from "../../assets/svg/TrashPS";
import { getData } from "../../redux/callsApi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataTeachById, deleteDataTeachAll, addDataTeachAllF, addDataTeachById } from "../../redux/functions";

const SingleCatalog = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchId, setSearchId] = useState(null);
    const location = useLocation();

    const [usage, setUsage] = useState(0);

    const { currentUser } = useContext(AuthContext);
    const { dataInfo, dataTeach } = useSelector(state => state.allTests);
    const dispatch = useDispatch();
    const navigation = useNavigate();


    useEffect(() => {
        const getTests = async () => {
            await getData(currentUser.accessToken, "/tests/getTests", dispatch);
            setIsLoading(false);
        }

        if (dataInfo.length > searchId) {
            setIsLoading(false);
            handleTeach();
        } else {
            getTests();
        }

    }, [searchId])

    useEffect(() => {
        setSearchId(location.pathname.split('/')[2]);
    }, [])

    useEffect(() => {
        handleTeach();
        console.log(dataTeach);
    }, [dataTeach])

    const handleTeach = () => {
        if (searchId === null) return null;

        let number = 0;

        dataInfo[searchId].data.forEach(el => {
            dataTeach.forEach(el2 => {
                if (el.id === el2.id) {
                    number++;
                }
            })
        })

        setUsage(number);
    }


    const checkItem = (el) => {
        let state = false;

        dataTeach.forEach((el2) => {
            if (el2.id === el.id) {
                state = true;
            }
        })

        return state;
    }

    const handleDelete = (id) => {
        deleteDataTeachById(id, dataTeach, dispatch);
    }

    const handleAddAll = (el) => {
        addDataTeachAllF(el, dataTeach, dispatch);
    }

    const handleRemoveAll = (el) => {
        deleteDataTeachAll(el, dataTeach, dispatch);
    }

    const handleEdit = (el) => {
        deleteDataTeachAll(el, dataTeach, dispatch);
        navigation(`/catalogs/edit/${searchId}`);
    }

    const handleAdd = (el) => {
        addDataTeachById(el, dataTeach, dispatch);
    }

    if (isLoading) {
        return null;
    }

    return (
        <section>
            <div className="content-top">
                <h2>{dataInfo[searchId].name}</h2>
                <p className="content-top-p">| Catalog</p>
                <p>| In usage: {usage}</p>
                <div className="contents">
                    <button onClick={() => handleEdit(dataInfo[searchId])} className="button-contents small">
                        Edit
                    </button>
                    <NavLink className="button-contents small" to={`/catalogs`}>Catalogs</NavLink>
                    {usage === dataInfo[searchId].data.length ?
                        <button onClick={() => handleRemoveAll(dataInfo[searchId])} className="button-contents small">
                            Remove all
                        </button>
                        :
                        <button onClick={() => handleAddAll(dataInfo[searchId])} className="button-contents small">
                            Add all to teach
                        </button>
                    }

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
                                    {!checkItem(el) ?
                                        <span onClick={() => handleAdd(el)}>
                                            <AddPS className="add-svg" />
                                        </span>
                                        :
                                        <span onClick={() => handleDelete(el.id)}>
                                            <TrashPS className="trash-svg" />
                                        </span>
                                    }

                                </div>

                            </div>

                        </div>
                    )
                })}
            </div>
        </section>
    );
}

export default SingleCatalog;