"use client";
import React, { useEffect, useState } from 'react';
import { MathJax } from 'better-react-mathjax';

type MathExpressionProps = {
  numerator1: number;
  denominator1: number;
  numerator2: number;
  denominator2: number;
  setResult: (result: number|null) => void;
}
const MathExpression = ({numerator1, denominator1, numerator2, denominator2, setResult}:MathExpressionProps) => {
  // State variables for the result fraction inputs
  const [resultNumerator, setResultNumerator] = useState<string>('');
  const [resultDenominator, setResultDenominator] = useState<string>('');

  // Handle numeric input change
  const handleNumericInputChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = event.target.value;
    if (/^-?\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };
  useEffect(()=>{
    setResultNumerator('');
    setResultDenominator('');
  }, [numerator1, denominator1, numerator2, denominator2])
  useEffect(() => {
    if (resultNumerator === '' || resultDenominator === '') {
      setResult(null);
    } else {
      const calcResult = Number(resultNumerator) / Number(resultDenominator);
      setResult(calcResult);
    }
  }, [resultDenominator, resultNumerator]);

  return (
      <div className='expression flex items-center justify-start'>
        <MathJax style={{fontSize:'50px', color:'#000'}}>{`\\(\\frac{${numerator1}}{${denominator1}} × \\frac{${numerator2}}{${denominator2}} = \\)`}</MathJax>
        <div className='flex flex-col gap-1 ml-5'>
          <input
            type="text"
            id="result-numerator"
            value={resultNumerator}
            className="math-input"
            autoComplete="off"
            onChange={(e) => handleNumericInputChange(e, setResultNumerator)}
          />
          <span className='h-[1px] bg-black w-full' />
          <input
            type="text"
            id="result-denominator"
            value={resultDenominator}
            className="math-input"
            autoComplete="off"
            onChange={(e) => handleNumericInputChange(e, setResultDenominator)}
          />
        </div>
      </div>
  );
};

export default MathExpression;
