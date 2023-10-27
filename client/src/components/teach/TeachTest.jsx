import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { checkTeach } from "./teach-functions";
import TeachTestItems from "./TeachTestItems";

const TeachTest = () => {

    const { dataTeach } = useSelector(state => state.allTests);
    const [test, setTest] = useState([]);
    const [actualNumber, setActualNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [pointGood, setPointGood] = useState(0);
    const [pointBad, setPointBad] = useState(0);
    const [time, setTime] = useState(0);
    const [text, setText] = useState('00:00');
    const [textTime, setTextTime] = useState('');
    const [isFinish, setIsFinish] = useState(false);
    const refInput = useRef();

    const [inputs, setInputs] = useState(
        {
            en: "",
            en2: "",
            en3: "",
            enopposite: ""
        }
    )

    const [states, setStates] = useState({
        good: false,
        bad: false,
        text: ""
    })

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        let timeString = "";
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;


        if (minutes < 10) {
            timeString += `0${minutes}:`;
        } else {
            timeString += `${minutes}:`;
        }

        if (seconds < 10) {
            timeString += `0${seconds}`;
        } else {
            timeString += `${seconds}`;
        }

        setText(timeString);
    }, [time])

    const setTimer = () => {
        setTime((prevState) => prevState + 1);
    }

    useEffect(() => {
        if (test.length > 3) {
            const number = getRandomInt(test.length);
            setActualNumber(number);
            setIsLoading(false);
        }
    }, [test])

    useEffect(() => {
        if (dataTeach.length > 0) {
            setTest(dataTeach);
        }

        const interval = setInterval(setTimer, 1000);
        return () => clearInterval(interval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const setArray = (obj) => {
        let array = [];

        if (obj.isOk) {
            array = test.filter((el, index) => {
                if (index !== actualNumber) {
                    return el;
                }
            })
            setPointGood((prevState) => prevState + 1);
            setStates({
                good: true,
                bad: false,
                text: obj.text,
            });
        } else {
            setPointBad((prevState) => prevState + 1);
            array = test;
            setStates({
                good: false,
                bad: true,
                text: obj.text,
            });
        }
        setTest(array);
        setInputs(
            {
                en: "",
                en2: "",
                en3: "",
                enopposite: ""
            }
        )

        if (array.length > 0) {

            const number = getRandomInt(array.length);
            setActualNumber(number);
        } else {
            setIsFinish(true);
            setTextTime(text);
        }
        setIsLoading(false);
    }


    const handleClick = () => {

        const obj = checkTeach(inputs, test[actualNumber]);
        setIsLoading(true);
        setArray(obj);
        refInput.current.focus();

    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }

    const handleAgain = (e) => {
        e.preventDefault();

        setTest(dataTeach);
        setIsFinish(false);
        setTime(0);
        setPointBad(0);
        setPointGood(0);
    }

    if (isLoading) {
        return null;
    }

    return (
        <section style={{ padding: 0 }}>
            <div className="test">
                {!isFinish ?
                    <TeachTestItems
                        test={test}
                        actualNumber={actualNumber}
                        text={text}
                        pointBad={pointBad}
                        pointGood={pointGood}
                        inputs={inputs}
                        states={states}
                        handleChange={handleChange}
                        handleClick={handleClick}
                        refInput={refInput}
                    />
                    :
                    <>
                        <div className="test-top">
                            <div className="title">
                                <h2>Scores</h2>
                            </div>
                            <div className="test-scores">
                                <div className="test-score">
                                    <h3>Name </h3>
                                    <p className="firstMainColor">{dataTeach[0].name}</p>
                                </div>

                                <div className="test-score">
                                    <h3>Time (s) </h3>
                                    <p className="firstMainColor monospace">{textTime}</p>
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
                                    <p>{dataTeach[0].state}</p>
                                </div>
                                <div className="test-score">
                                    <h3>Fill</h3>
                                    <p>{dataTeach[0].fill}</p>
                                </div>
                            </div>
                        </div>

                        <div className="test-middle-again">
                            <h3>A może jeszcze raz?</h3>
                            <button onClick={handleAgain} type="submit" className="button-contents">Tak</button>
                        </div>

                    </>


                }

            </div>




        </section>

    );
}

export default TeachTest;