import { ReactNode, createContext, useState } from "react";

interface CalculatorProviderProps {
    children: ReactNode
}

interface CalculatorContextType {
    screen: (string | number)[],
    setScreen: React.Dispatch<React.SetStateAction<(string | number)[]>>,
    numsToOperation: (string | number)[],
    buttons: (string | number)[],
}

const CalculatorContext = createContext<CalculatorContextType | null>(null);
CalculatorContext.displayName = "Calculator";

const CalculatorProvider = ({ children }: CalculatorProviderProps) => {
    const [screen, setScreen] = useState<(number | string)[]>([]);
    let numsToOperation: (string | number)[] = [];
    const buttons = [
        7, 8, 9, "DEL",
        4, 5, 6, "+",
        1, 2, 3, "-",
        ".", 0, "/", "x",
        "RESET", "="
    ];
    return (
        <CalculatorContext.Provider
            value={
                {
                    screen,
                    setScreen,
                    numsToOperation,
                    buttons
                }}>
            {children}
        </CalculatorContext.Provider>
    )
};
export { CalculatorProvider, CalculatorContext }
