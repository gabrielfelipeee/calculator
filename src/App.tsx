import { CalculatorProvider } from './context/CalculatorContext';
import Calculator from './components/Calculator';


function App() {
  return (
    <CalculatorProvider>
      <Calculator />
    </CalculatorProvider>
  )
}
export default App;
