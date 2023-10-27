import { useContext, useState } from "react";
import NewNormal from "./NewNormal";
import NewOpposite from "./NewOpposite";
import NewThree from "./NewThree";
import NewTwo from "./NewTwo";
import TrashPS from "../../assets/svg/TrashPS";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { addNewCatalog } from "../../redux/functions";

const New = () => {

    const [array, setArray] = useState([]);
    const { dataInfo } = useSelector(state => state.allTests);
    const dispatch = useDispatch();

    const { currentUser } = useContext(AuthContext);

    const [inputs, setInputs] = useState(
        {
            pl: "",
            plopposite: "",
            en: "",
            en2: "",
            en3: "",
            enopposite: ""
        }
    )

    const [name, setName] = useState("");
    const [state, setState] = useState("static");
    const [fill, setFill] = useState("fill");
    const [type, setType] = useState("normal");

    const handleChangeOptions = (e, typeOfSelect) => {
        if (typeOfSelect === "state") {
            setState(e.target.value);
        } else if (typeOfSelect === "fill") {
            setFill(e.target.value);
        } else if (typeOfSelect === "type") {
            setType(e.target.value);
            setArray([]);
        }


        setInputs({
            pl: "",
            plopposite: "",
            en: "",
            en2: "",
            en3: "",
            enopposite: ""
        })
    }

    const handleChangeInputs = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddToArray = (type) => {

        if (type === "normal") {
            if (inputs.pl.length < 3 || inputs.en.length < 3) {
                return null;
            }
        } else if (type === "two") {
            if (inputs.pl.length < 3 || inputs.en.length < 3 || inputs.en2.length < 3) {
                return null;
            }
        } else if (type === "three") {
            if (inputs.pl.length < 3 || inputs.en.length < 3 || inputs.en2.length < 3 || inputs.en3.length < 3) {
                return null;
            }
        } else if (type === "opposite") {
            if (inputs.pl.length < 3 || inputs.en.length < 3 || inputs.plopposite.length < 3 || inputs.enopposite.length < 3) {
                return null;
            }
        }


        setArray((prevState) => ([
            ...prevState,
            {
                ...inputs,
                id: new Date().getTime(),
                name,
                state,
                fill,
                type
            }
        ]));

        setInputs({
            pl: "",
            plopposite: "",
            en: "",
            en2: "",
            en3: "",
            enopposite: ""
        })
    }

    const handleClickAdd = () => {
        if (array.length === 0 || name.length < 3) return null;


        let data = [];

        data = array.map(el => {
            return {
                name,
                fill,
                state,
                type,
                pl: el.pl,
                en: el.en,
                en2: el.en2,
                en3: el.en3,
                plopposite: el.plopposite,
                enopposite: el.enopposite,
                id: el.id,
            }
        })

        const obj = {
            id: dataInfo.length,
            fill,
            name,
            state,
            type,
            data
        }

        addNewCatalog(currentUser.accessToken, "/tests/catalog/addNewCatalog", dataInfo, obj, dispatch);

    }

    const handleDelete = (id) => {
        let arrayHelper = [];

        arrayHelper = array.filter(el => {
            if (id !== el.id) {
                return el;
            }
        })

        setArray(arrayHelper);
    }

    return (<section>
        <div className="form">
            <div className="input-box">
                <h3>Catalog name</h3>
                <input className="input-contents" type="text" value={name} name="name" onChange={e => setName(e.target.value)} />
            </div>
            <div className="input-box">
                <h3>State</h3>
                <select className="select-contents" value={state} onChange={e => handleChangeOptions(e, "state")}>
                    <option value="static">Static</option>
                    <option value="dynamic">Dynamic</option>
                </select>
            </div>
            <div className="input-box">
                <h3>Fill</h3>
                <select className="select-contents" value={fill} onChange={e => handleChangeOptions(e, "fill")}>
                    <option value="fill">Fill</option>
                    <option value="no-fill">No-fill</option>
                </select>
            </div>

            <div className="input-box">
                <h3>Type</h3>
                <select className="select-contents" value={type} onChange={e => handleChangeOptions(e, "type")}>
                    <option value="normal">Normal</option>
                    <option value="two">Two</option>
                    <option value="three">Three</option>
                    <option value="opposite">Opposite</option>
                </select>
            </div>

            <div className="input-box">
                <h3>Add catalog</h3>
                <button className="button-contents" onClick={handleClickAdd}>Save</button>
            </div>
        </div>

        <h3 style={{ color: 'tomato', textAlign: 'center', marginBottom: 30 }}>If you change &quot;Type&quot; option your words will be deleted! You can change options later in edit mode!</h3>

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

            {array.map((el, index) => {
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

            {type === "normal" && <NewNormal inputs={inputs} handleChangeInputs={handleChangeInputs} array={array} handleAddToArray={handleAddToArray} />}
            {type === "opposite" && <NewOpposite inputs={inputs} handleChangeInputs={handleChangeInputs} array={array} handleAddToArray={handleAddToArray} />}
            {type === "three" && <NewThree inputs={inputs} handleChangeInputs={handleChangeInputs} array={array} handleAddToArray={handleAddToArray} />}
            {type === "two" && <NewTwo inputs={inputs} handleChangeInputs={handleChangeInputs} array={array} handleAddToArray={handleAddToArray} />}
        </div>


    </section>);
}

export default New;