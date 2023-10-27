const TeachOpposite = ({ inputs, handleClick, handleChange, refInput }) => {

    const keyDownHandler = event => {
        if (event.key === 'Enter') {
            handleClick();
        }
    }

    return (
        <div className="test-middle-bottom-el-box inputs">
            <input
                type="text"
                className="input-contents"
                value={inputs.en}
                name="en"
                onChange={(e) => handleChange(e)}
                placeholder="Word"
                autoComplete="off"
                ref={refInput}
                onKeyDown={keyDownHandler}
            />

            <input
                type="text"
                className="input-contents"
                value={inputs.enopposite}
                name="enopposite"
                onChange={(e) => handleChange(e)}
                placeholder="Opposite"
                autoComplete="off"
                onKeyDown={keyDownHandler}
            />

            <button className="button-contents small" onKeyDown={keyDownHandler} onClick={handleClick}>Check</button>
        </div>
    );
}

export default TeachOpposite;