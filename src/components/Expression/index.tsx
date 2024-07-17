"use client"
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import MathExpression from "./MathExpression";
import Decimal from 'decimal.js';

const Expression = () => {
  const [ numerator1, setNumerator1 ] = useState<number>(6);
  const [ denominator1, setDenominator1 ] = useState<number>(5);
  const [ numerator2, setNumerator2 ] = useState<number>(3);
  const [ denominator2, setDenomiator2 ] = useState<number>(9);
  const [ result, setResult ] = useState<number|null>(null);
  const [ answer, setAnswer] = useState<number|null>(null);

  useEffect(()=>{
    generateRandomFractions();
  }, []);

  useEffect(()=>{
    const num1 = new Decimal(numerator1);
    const den1 = new Decimal(denominator1);
    const num2 = new Decimal(numerator2);
    const den2 = new Decimal(denominator2);

    const calcAnswer = num1.div(den1).mul(num2.div(den2));
    setAnswer(calcAnswer.toNumber());
  }, [numerator1, denominator1, numerator2, denominator2])
  
  const generateRandomFractions = () => {
    setNumerator1(Math.floor(Math.random() * 9) + 1);
    setDenominator1(Math.floor(Math.random() * 9) + 1);
    setNumerator2(Math.floor(Math.random() * 9) + 1);
    setDenomiator2(Math.floor(Math.random() * 9) + 1);
    setResult(null); // Reset result for new question
  };

  const handleCheckResult = () => {
    if (result !== null && answer !== null) {
      const resultDecimal = new Decimal(result);
      const answerDecimal = new Decimal(answer);

      if (resultDecimal.equals(answerDecimal)) {
        alert('correct');
      } else {
        alert('wrong');
      }
    } else {
      alert('wrong');
    }
  };

  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Expression"
          paragraph="Explore fractions and see how parts make up a whole. Practice multiplying fractions in our Playground."
          center
        />
        <div className="flex flex-col flex-full bg-white rounded-lg pt-24 pb-12 px-12 gap-16">
          <MathExpression 
            numerator1={numerator1}
            denominator1={denominator1}
            numerator2={numerator2}
            denominator2={denominator2}
            setResult={setResult}
          />
          <div className='flex gap-2'>
            <button className='text-white bg-primary border border-primary px-8 py-2 rounded-md ' onClick={handleCheckResult}>Check</button>
            <button className='text-primary bg-white border border-primary px-8 py-2 rounded-md 'onClick={generateRandomFractions}>Next</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expression;
