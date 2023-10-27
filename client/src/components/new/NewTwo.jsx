import AddPS from "../../assets/svg/AddPS";

const NewTwo = ({ inputs, handleChangeInputs, array, handleAddToArray }) => {

    return (
        <div className="word-body">
            <div className="word-content">
                <p>
                    {array.length + 1}
                </p>

                <div className="box-input">
                    <input type="text" value={inputs.pl} name="pl" onChange={handleChangeInputs} autoComplete="off" />
                </div>

                <p className="p-empty">
                    None!
                </p>

                <div className="box-input">
                    <input type="text" value={inputs.en} name="en" onChange={handleChangeInputs} autoComplete="off" />
                </div>

                <div className="box-input">
                    <input type="text" value={inputs.en2} name="en2" onChange={handleChangeInputs} autoComplete="off" />
                </div>

                <p className="p-empty">
                    None!
                </p>

                <p className="p-empty">
                    None!
                </p>

                <div className="word-functions">
                    <span onClick={() => handleAddToArray("two")}>
                        <AddPS className="add-svg" />
                    </span>
                </div>

            </div>

        </div>
    );
}

export default NewTwo;