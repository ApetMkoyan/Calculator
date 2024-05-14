import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState('0');
  const resultRef = useRef();

  const adjustFontSize = () => {
    result.length > 10 ? (resultRef.current.style.fontSize = '30px') : (resultRef.current.style.fontSize = '50px');
  };

  const handleClick = (e) => {
    setResult((prevResult) => {
      const newResult = prevResult === '0' ? e.target.name : prevResult.concat(e.target.name);
      adjustFontSize();
      return newResult;
    });
  };

  const removeLast = () => {
    setResult((prevResult) => {
      const newResult = prevResult.length < 2 ? '0' : prevResult.slice(0, prevResult.length - 1);
      adjustFontSize();
      return newResult;
    });
  };

  const clearResult = () => {
    setResult('0');
    adjustFontSize();
  };

  const evaluateResult = () => {
    try {
      setResult((prevResult) => {
        const newResult = String(eval(prevResult));
        adjustFontSize();
        return newResult;
      });
    } catch {
      setResult('Error404');
    }
  };
  

  return (
    <div className="App">
      <div className="calculator">
        <div className="result">
          <span ref={resultRef}>{result}</span>
        </div>
        <div className="buttons">
          <button className="butt" onClick={removeLast} name="AC">
            AC
          </button>
          <button className="butt" onClick={clearResult} name="C">
            C
          </button>
          {[...'1234567890'].map((number) => (
            <button key={number} className="butt" onClick={handleClick} name={number}>
              {number}
            </button>
          ))}
          {['+', '-', '*', '/'].map((operator) => (
            <button key={operator} className="butt" onClick={handleClick} name={operator}>
              {operator}
            </button>
          ))}
          <button className="butt butt2" onClick={evaluateResult} name="=">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
