import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ICalculatorContextData {
    screen: (string | number)[],
    setScreen: React.Dispatch<React.SetStateAction<(string | number)[]>>,
    numsToOperation: (string | number)[],
    buttons: (string | number)[],
    calc: (item: string | number) => void
};
const CalculatorContext = createContext({} as ICalculatorContextData);
CalculatorContext.displayName = "Calculator";


interface CalculatorProviderProps {
    children: ReactNode
};

const buttons = [
    7, 8, 9, "DEL",
    4, 5, 6, "+",
    1, 2, 3, "-",
    ".", 0, "/", "x",
    "RESET", "="
];
export const CalculatorProvider = ({ children }: CalculatorProviderProps) => {
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
            if (typeof screen[i - 1] === "string" && typeof screen[i] === "string" || typeof screen[0] == "string") {
                setScreen(screen.slice(0, -1));
            }
        }
    }, [screen])

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
    };
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

    return (
        <CalculatorContext.Provider
            value={
                {
                    screen,
                    setScreen,
                    numsToOperation,
                    buttons,
                    calc
                }}>
            {children}
        </CalculatorContext.Provider>
    )
};
export const useCalculator = () => {
    return useContext(CalculatorContext);
};
