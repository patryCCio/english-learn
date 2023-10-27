import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { getData } from "../../redux/callsApi";
import { NavLink } from "react-router-dom";
import TrashPS from "../../assets/svg/TrashPS";
import { deleteDataTeachById } from "../../redux/functions";

const Teach = () => {

    const { currentUser } = useContext(AuthContext);
    const { dataInfo, dataTeach } = useSelector(state => state.allTests);
    const dispatch = useDispatch();

    useEffect(() => {

        const getTests = async () => {
            await getData(currentUser.accessToken, "/tests/getTests", dispatch);
        }

        if (dataInfo.length === 0) {
            getTests();
        }
    })

    const handleDelete = (id) => {
        deleteDataTeachById(id, dataTeach, dispatch);
    }

    return (
        <section>
            <div className="heading-top" style={{ gap: "20px" }}>
                <h2 style={{ textAlign: 'center' }}>Teach</h2>
                <p>{dataTeach.length}</p>
                {dataTeach.length > 3 &&
                    <NavLink to="/teach/test" className="button-contents small">Start teach</NavLink>
                }
            </div>
            {dataTeach.length === 0 ?
                < div className="you" >
                    <h3>
                        You don&apos;t have selected words to teach!
                    </h3>
                </div>
                :

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
                    {dataTeach.map((el, index) => {
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
                                        <span onClick={() => handleDelete(el.id)}>
                                            <TrashPS className="trash-svg" />
                                        </span>
                                    </div>

                                </div>

                            </div>
                        )
                    })}
                </div>
            }

        </section >
    );
}

export default Teach;