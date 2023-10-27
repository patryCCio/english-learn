const TeachNormal = ({ inputs, handleClick, handleChange, refInput }) => {

    const keyDownHandler = event => {
        if (event.key === 'Enter') {
            handleClick();
        }
    }

    return (
        <div className="test-middle-bottom-el-box">
            <input
                type="text"
                className="input-contents"
                value={inputs.en}
                name="en"
                onKeyDown={(e) => keyDownHandler(e)}
                onChange={handleChange}
                placeholder="Word"
                autoComplete="off"
                ref={refInput}
            />


            <button className="button-contents small" onClick={handleClick}>Check</button>
        </div>
    );
}

export default TeachNormal;