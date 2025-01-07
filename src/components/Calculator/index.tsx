import { useCalculator } from '../../context/CalculatorContext';
import Theme from '../Theme';
import './styles.scss';


const Calculator = () => {
    const { calc, screen, buttons } = useCalculator();

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
