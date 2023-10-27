const TeachTwo = ({ inputs, handleChange, handleClick, refInput }) => {

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
                onChange={(e) => handleChange(e)}
                placeholder="Word 1"
                autoComplete="off"
                ref={refInput}
                onKeyDown={keyDownHandler}
            />

            <input
                type="text"
                className="input-contents"
                value={inputs.en2}
                name="en2"
                onChange={(e) => handleChange(e)}
                placeholder="Word 2"
                autoComplete="off"
                onKeyDown={keyDownHandler}
            />

            <button className="button-contents small" onKeyDown={keyDownHandler} onClick={handleClick}>Check</button>
        </div>
    );
}

export default TeachTwo;