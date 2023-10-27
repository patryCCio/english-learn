const checkOpposite = (fill, en, enopposite, enInputs, enoppositeInputs, test) => {
    if (fill) {
        if (en === enInputs && enopposite === enoppositeInputs) {
            return {
                isOk: true,
                text:
                    `
                        <p>It was a good answer!</p>
                    `
            };
        }
    } else {
        let isFirstOption = false;
        let isSecondOption = false;

        if (en === enInputs) {
            isFirstOption = true;
        }

        if (enopposite === enoppositeInputs) {
            isSecondOption = true;
        }

        if (isFirstOption && isSecondOption) {
            return {
                isOk: true,
                text:
                    `
                        <p>It was a good answer!</p>
                    `
            }
        }

        if (isFirstOption && !isSecondOption) {
            return {
                isOk: true,
                text:
                    `
                        <p>Correct but for "${test.plopposite}" correct answer is "${test.enopposite}"!</p>
                    `
            }
        }

        if (isSecondOption && !isFirstOption) {
            return {
                isOk: true,
                text: `
                        <p>Correct but for "${test.pl}" correct answer is "${test.en}"!</p>
                    `
            }
        }
    }

    return {
        isOk: false,
        text:
            `
                <p>The correct answer for "${test.pl}" is...<p>
                <h4>${test.en}</h4> 
                <p>and opposite for "${test.plopposite}" is...</p>
                <h4>${test.enopposite}</h4>
            `
    }

}

const checkNormal = (en, enInputs, test) => {
    if (en === enInputs) {
        return {
            isOk: true,
            text: `
                <p>It was a good answer!</p>
            `
        }
    }

    return {
        isOk: false,
        text: `
            <p>The correct answer for "${test.pl}" is...<p>
            <h4>${test.en}</h4>
        `
    }
}

const checkTwo = (fill, state, en, en2, enInputs, en2Inputs, test) => {
    if (state) {
        if (fill) {
            if (en === enInputs && en2 === en2Inputs) {
                return {
                    isOk: true,
                    text: `
                        <p>It was a good answer!</p>
                    `
                }
            }
        } else {
            let isFirstOption = false;
            let isSecondOption = false;

            if (en === enInputs) {
                isFirstOption = true;
            }

            if (en2 === en2Inputs) {
                isSecondOption = true;
            }

            if (isFirstOption && isSecondOption) {
                return {
                    isOk: true,
                    text:
                        `
                        <p>It was a good answer!</p>
                    `
                }
            }

            if (isFirstOption && !isSecondOption) {
                return {
                    isOk: true,
                    text:
                        `
                        <p>Correct but for "${test.pl}" you can use "${test.en2}" too!</p>
                    `
                }
            }

            if (isSecondOption && !isFirstOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en}" too!</p>
                    `
                }
            }

        }
    } else {
        if (fill) {
            if ((en === enInputs || en === en2Inputs) && (en2 === enInputs || en2 === en2Inputs) && enInputs !== en2Inputs) {
                return {
                    isOk: true,
                    text:
                        `
                        <p>It was a good answer!</p>
                    `
                }
            }
        } else {
            let isFirstOption = false;
            let isSecondOption = false;

            if ((en === enInputs || en === en2Inputs) && enInputs !== en2Inputs) {
                isFirstOption = true;
            }
            if ((en2 === en2Inputs || en2 === enInputs) && enInputs !== en2Inputs) {
                isSecondOption = true;
            }

            if (isFirstOption && isSecondOption) {
                return {
                    isOk: true,
                    text:
                        `
                        <p>It was a good answer!</p>
                    `
                }
            }

            if (isFirstOption && !isSecondOption) {
                return {
                    isOk: true,
                    text:
                        `
                        <p>Correct but for "${test.pl}" you can use "${test.en2}" too!</p>
                    `
                }
            }

            if (isSecondOption && !isFirstOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en}" too!</p>
                    `
                }
            }
        }
    }



    return {
        isOk: false,
        text: `<p>Correct answer for "${test.pl}" are "${test.en}" and "${test.en2}"!</p>`
    };
}

const checkThree = (fill, state, en, en2, en3, enInputs, en2Inputs, en3Inputs, test) => {
    if (state) {
        if (fill) {
            if (en === enInputs && en2 === en2Inputs && en3 === en3Inputs) {
                return {
                    isOk: true,
                    text: `
                        <p>It was a good answer!</p>
                    `
                }
            }
        } else {

            let isFirstOption = false;
            let isSecondOption = false;
            let isThirdOption = false;

            if (en === enInputs) {
                isFirstOption = true;
            }

            if (en2 === en2Inputs) {
                isSecondOption = true;
            }

            if (en3 === en3Inputs) {
                isThirdOption = true;
            }

            if (isFirstOption && isSecondOption && isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>It was a good answer!</p>
                    `
                }
            }

            if (isFirstOption && isSecondOption && !isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en3}" too!</p>
                    `
                }
            }

            if (isFirstOption && !isSecondOption && isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en2}" too!</p>
                    `
                }
            }

            if (!isFirstOption && isSecondOption && isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en}" too!</p>
                    `
                }
            }

            if (!isFirstOption && !isSecondOption && isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en}" and "${test.en2}" too!</p>
                    `
                }
            }

            if (!isFirstOption && isSecondOption && !isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en}" and "${test.en3}" too!</p>
                    `
                }
            }

            if (isFirstOption && !isSecondOption && !isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en2}" and "${test.en3}" too!</p>
                    `
                }
            }
        }

    } else {
        if (fill) {
            if (
                (en === enInputs || en === en2Inputs || en === en3Inputs)
                &&
                (en2 === enInputs || en2 === en2Inputs || en2 === en3Inputs)
                &&
                (en3 === enInputs || en3 === en2Inputs || en3 === en3Inputs)
                &&
                (enInputs !== en2Inputs && enInputs !== en3Inputs && en2Inputs !== en3Inputs)
            ) {
                return {
                    isOk: true,
                    text: `
                        <p>It was a good answer!</p>
                    `
                }
            }
        } else {
            let isFirstOption = false;
            let isSecondOption = false;
            let isThirdOption = false;

            if (en === enInputs) {
                isFirstOption = true;
            }

            if (en2 === en2Inputs) {
                isSecondOption = true;
            }

            if (en3 === en3Inputs) {
                isThirdOption = true;
            }

            if (isFirstOption && isSecondOption && isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>It was a good answer!</p>
                    `
                }
            }

            if (isFirstOption && isSecondOption && !isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en3}" too!</p>
                    `
                }
            }

            if (isFirstOption && !isSecondOption && isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en2}" too!</p>
                    `
                }
            }

            if (!isFirstOption && isSecondOption && isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en}" too!</p>
                    `
                }
            }

            if (!isFirstOption && !isSecondOption && isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en}" and "${test.en2}" too!</p>
                    `
                }
            }

            if (!isFirstOption && isSecondOption && !isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en}" and "${test.en3}" too!</p>
                    `
                }
            }

            if (isFirstOption && !isSecondOption && !isThirdOption) {
                return {
                    isOk: true,
                    text: `
                        <p>Correct but for "${test.pl}" you can use "${test.en2}" and "${test.en3}" too!</p>
                    `
                }
            }
        }
    }



    return {
        isOk: false,
        text: `
            <p>The correct answer for "${test.pl}" is...<p>
            <h4>${test.en}</h4> 
            <h4>${test.en2}</h4>
            <h4>${test.en3}</h4>
        `
    }
}

const checkType = (fill, state, inputs, test) => {
    let en = test.en.toLowerCase();
    let en2 = test.en2.toLowerCase();
    let en3 = test.en3.toLowerCase();
    en = en.replace(" ", "");
    en2 = en2.replace(" ", "");
    en3 = en3.replace(" ", "");

    let enInputs = inputs.en.toLowerCase();
    let en2Inputs = inputs.en2.toLowerCase();
    let en3Inputs = inputs.en3.toLowerCase();
    enInputs = enInputs.replace(" ", "");
    en2Inputs = en2Inputs.replace(" ", "");
    en3Inputs = en3Inputs.replace(" ", "");

    let enopposite = test.enopposite.toLowerCase();
    let enoppositeInput = inputs.enopposite.toLowerCase();

    switch (test.type) {
        case 'opposite':
            return checkOpposite(fill, en, enopposite, enInputs, enoppositeInput, test);
        case 'normal':
            return checkNormal(en, enInputs, test);
        case 'two':
            return checkTwo(fill, state, en, en2, enInputs, en2Inputs, test);
        case 'three':
            return checkThree(fill, state, en, en2, en3, enInputs, en2Inputs, en3Inputs, test);
    }



}

const checkState = (fill, inputs, test) => {
    if (test.state === "static") {
        return checkType(fill, true, inputs, test);
    } else {
        return checkType(fill, false, inputs, test);
    }
}

const checkFill = (inputs, test) => {
    if (test.fill === "fill") {
        return checkState(true, inputs, test);
    } else {
        return checkState(false, inputs, test);
    }
}


export const checkTeach = (inputs, test, actualNumber) => {
    return checkFill(inputs, test, actualNumber);
}