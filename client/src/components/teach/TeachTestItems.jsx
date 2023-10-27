import { useSelector } from "react-redux";
import TeachOpposite from "./TeachOpposite";
import TeachNormal from "./TeachNormal";
import TeachTwo from "./TeachTwo";
import TeachThree from "./TeachThree";

const TeachTestItems = ({ test, actualNumber, text, pointBad, pointGood, inputs, states, handleChange, handleClick, refInput }) => {

    const { dataTeach } = useSelector(state => state.allTests);

    return (
        <>
            <div className="test-top">
                <div className="title">
                    <h2>Scores</h2>
                </div>
                <div className="test-scores">
                    <div className="test-score">
                        <h3>Name </h3>
                        <p className="firstMainColor">{test[actualNumber].name}</p>
                    </div>

                    <div className="test-score">
                        <h3>Time (s) </h3>
                        <p className="firstMainColor monospace">{text}</p>
                    </div>

                    <div className="test-score">
                        <h3>Correct</h3>
                        <p className="thirdMainColor">{pointGood}</p>
                    </div>
                    <div className="test-score">
                        <h3>Incorrect</h3>
                        <p className="secondMainColor">{pointBad}</p>
                    </div>
                    <div className="test-score">
                        <h3>State</h3>
                        <p>{test[actualNumber].state}</p>
                    </div>
                    <div className="test-score">
                        <h3>Fill</h3>
                        <p>{test[actualNumber].fill}</p>
                    </div>
                </div>
            </div>

            <div className="test-middle">
                <div className="test-middle-top">
                    <div className="progress-bar">
                        <span style={{ width: `${((dataTeach.length - test.length) / dataTeach.length) * 100}%` }}></span>
                        <p>
                            <span>{dataTeach.length - test.length}</span>
                            <span style={{ color: "tomato" }}>&nbsp;/&nbsp;</span>
                            <span>{dataTeach.length}</span>
                        </p>

                    </div>
                </div>
                <div className="test-middle-bottom">
                    <div className="test-middle-bottom-el">
                        <h2>Translate</h2>
                        {test[actualNumber].type === "opposite" && <TeachOpposite inputs={inputs} handleClick={handleClick} handleChange={handleChange} refInput={refInput} />}
                        {test[actualNumber].type === "normal" && <TeachNormal inputs={inputs} handleClick={handleClick} handleChange={handleChange} refInput={refInput} />}
                        {test[actualNumber].type === "two" && <TeachTwo inputs={inputs} handleClick={handleClick} handleChange={handleChange} refInput={refInput} />}
                        {test[actualNumber].type === "three" && <TeachThree inputs={inputs} handleClick={handleClick} handleChange={handleChange} refInput={refInput} />}
                    </div>
                    <div className="test-middle-bottom-el">
                        <div className="test-middle-bottom-el-box" style={{ backgroundColor: "#121212" }}>
                            <div className="box" style={{
                                marginBottom: '15px'
                            }}>
                                <h3>Type</h3>
                                <p>{test[actualNumber].type.toUpperCase()}</p>
                            </div>
                            <div className="box">
                                <h3 className="firstMainColor">In polish</h3>
                                <p>{test[actualNumber].pl}</p>
                            </div>
                            {test[actualNumber].type === "opposite" &&
                                <div className="box">
                                    <h3>Opposite</h3>
                                    <p>{test[actualNumber].plopposite}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {states.good &&
                <div className="test-bottom good">
                    <h3>Good job!</h3>
                    <div dangerouslySetInnerHTML={{ __html: states.text }}></div>
                </div>
            }

            {states.bad &&
                <div className="test-bottom bad">
                    <h3>Upssss!</h3>
                    <div dangerouslySetInnerHTML={{ __html: states.text }}></div>
                </div>
            }
        </>
    );
}

export default TeachTestItems;