import { useDispatch, useSelector } from "react-redux";
import AddPS from "../../assets/svg/AddPS";
import { useState } from "react";
import { addElementDataInfo } from "../../redux/functions";

const AddItemTwo = ({ searchId }) => {

    const { dataInfo } = useSelector(state => state.allTests);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        pl: "",
        plopposite: "",
        en: "",
        en2: "",
        en3: "",
        enopposite: ""
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleAdd = () => {
        if (inputs.pl === "" || inputs.en === "" || inputs.en2 === "") {
            return null;
        }
        setInputs({
            pl: "",
            plopposite: "",
            en: "",
            en2: "",
            en3: "",
            enopposite: ""
        })
        addElementDataInfo(dataInfo, "/tests/catalog/addItem", searchId, inputs, dispatch);
    }

    return (
        <div className="word-body">
            <div className="word-content">
                <p>
                    {dataInfo[searchId].data.length + 1}
                </p>

                <div className="box-input">
                    <input type="text" value={inputs.pl} name="pl" onChange={handleChange} autoComplete="off" />
                </div>

                <p className="p-empty">
                    None!
                </p>

                <div className="box-input">
                    <input type="text" value={inputs.en} name="en" onChange={handleChange} autoComplete="off" />
                </div>

                <div className="box-input">
                    <input type="text" value={inputs.en2} name="en2" onChange={handleChange} autoComplete="off" />
                </div>

                <p className="p-empty">
                    None!
                </p>

                <p className="p-empty">
                    None!
                </p>

                <div className="word-functions">
                    <span onClick={() => handleAdd()}>
                        <AddPS className="add-svg" />
                    </span>
                </div>

            </div>

        </div>
    );
}

export default AddItemTwo;