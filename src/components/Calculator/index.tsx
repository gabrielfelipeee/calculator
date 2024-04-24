import Theme from '../Theme';
import './styles.scss';
import { useEffect, useState } from 'react'

const Calculator = () => {
    const buttons = [
        7, 8, 9, "DEL",
        4, 5, 6, "+",
        1, 2, 3, "-",
        ".", 0, "/", "x",
        "RESET", "="
    ];
    const [screen, setScreen] = useState<(number | string)[]>([]);
    let numsToOperation: (string | number)[] = [];

    useEffect(() => {
        for (let i = 0; i < screen.length; i++) {
            if (typeof screen[i] === 'number' || screen[i] === ".") {
                let num = screen[i].toString();

                while (i + 1 < screen.length && typeof screen[i + 1] === 'number' || screen[i + 1] === ".") {
                    num += screen[i + 1]; // Irá concatenar, pois num é uma string
                    i++;
                }
                numsToOperation.push(Number(num));
            } else {
                numsToOperation.push(screen[i]);
            }
            if ( typeof screen[i - 1] === "string" && typeof screen[i] === "string") {
                setScreen(screen.slice(0, -1));
            }
        }
    }, [screen])

    const calc = (item: number | string) => {
        if (item !== "RESET" && item !== "DEL" && item !== "=") {
            setScreen([...screen, item]);
        }

        if (item === "=") {
            equal();
        } else if (item === "DEL") {
            setScreen(screen.slice(0, -1));
        } else if (item === "RESET") {
            setScreen([]);
        }
    };

    const equal = () => {
        let result = numsToOperation[0] as number;

        for (let i = 0; i < numsToOperation.length; i++) {
            let operator = numsToOperation[i] as string;
            let operand = numsToOperation[i + 1] as number;

            if (operator === "+") {
                result += operand;
            } else if (operator === "-") {
                result -= operand;
            } else if (operator === "/") {
                if (operand === 0) {
                    alert("Não é possível dividir por ZERO!");
                    setScreen([]);
                    return;
                }
                result /= operand;
            } else if (operator === "x") {
                result *= operand;
            }

            result = Number(result.toFixed(3));

            let resultInArray: (number | string)[] = [];
            for (let i = 0; i < result.toString().length; i++) {
                if (result.toString()[i] !== ".") {
                    resultInArray.push(Number(result.toString()[i]));
                } else {
                    resultInArray.push(result.toString()[i]);
                }
            }
            setScreen(resultInArray);
        }
    }

    return (
        <main className="container-calculator">
            <div className="box-title-theme">
                <h1>Calc</h1>
                <Theme />
            </div>
            <div className="box-calc">
                <div className="screen">{screen}</div>

                <div className="box-buttons">
                    <div className="buttons">
                        {
                            buttons.map((item, index) =>
                                <div
                                    key={index}
                                    className="btn"
                                    onClick={() => calc(item)}
                                >
                                    {item}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </main>

    )
}
export default Calculator;
