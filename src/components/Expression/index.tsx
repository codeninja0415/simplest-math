"use client"
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import MathExpression from "./MathExpression";
import Decimal from 'decimal.js';
import { ButtonPrimary, ButtonSecondary } from "../Button.style";
import { Modal, Box, Typography } from '@mui/material';
import { MathJax } from 'better-react-mathjax';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};

const CORRECT_RESULT_TEXT = 'Correct! You got the right answer.';
const WRONG_RESULT_TEXT = 'Oops! You got the incorrect answer';
const COMPLETE_RESULT_TEXT = 'Please enter a result.'

const Expression = () => {
  const [numerator1, setNumerator1] = useState<number>(6);
  const [denominator1, setDenominator1] = useState<number>(5);
  const [numerator2, setNumerator2] = useState<number>(3);
  const [denominator2, setDenomiator2] = useState<number>(9);
  const [result, setResult] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    generateRandomFractions();
  }, []);

  useEffect(() => {
    const num1 = new Decimal(numerator1);
    const den1 = new Decimal(denominator1);
    const num2 = new Decimal(numerator2);
    const den2 = new Decimal(denominator2);

    const calcAnswer = num1.div(den1).mul(num2.div(den2));
    setAnswer(calcAnswer.toNumber());
  }, [numerator1, denominator1, numerator2, denominator2]);

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
        setModalMessage(CORRECT_RESULT_TEXT);
      } else {
        setModalMessage(WRONG_RESULT_TEXT);
      }
      setIsResultModalOpen(true);
    } else {
      setModalMessage(COMPLETE_RESULT_TEXT);
      setIsResultModalOpen(true);
    }
  };

  const handleResultCloseModal = () => {
    generateRandomFractions();
    setIsResultModalOpen(false);
  };

  const handleSolutionCloseModal = () => {
    setIsSolutionModalOpen(false);
  };

  const handleOpenSolution = () => {
    setIsResultModalOpen(false);
    setIsSolutionModalOpen(true);
  }

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
            <ButtonPrimary onClick={handleCheckResult}>CHECK</ButtonPrimary>
            <ButtonSecondary onClick={generateRandomFractions}>NEXT</ButtonSecondary>
          </div>
        </div>
      </div>
      <Modal
        open={isResultModalOpen}
        onClose={handleResultCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2" color='#4a6cf7'>
            Validation
          </Typography>
          <Typography id="modal-description" sx={{ my: 4 }} color='red' fontSize={30}>
            {modalMessage}
          </Typography>
          <div className="flex gap-8">
            <ButtonSecondary onClick={handleResultCloseModal}>Try again</ButtonSecondary>
            {modalMessage !== CORRECT_RESULT_TEXT &&
              <ButtonSecondary onClick={handleOpenSolution}>Solution</ButtonSecondary>
            }
          </div>
        </Box>
      </Modal>
      <Modal
        open={isSolutionModalOpen}
        onClose={handleSolutionCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2" color='#4a6cf7' sx={{ textAlign: 'center' }}>
            Solution
          </Typography>
          <Typography id="modal-description" sx={{ my: 4 }} color='red' fontSize={30}>
            {modalMessage}
          </Typography>
          <div className="flex flex-col gap-8">
              <h2>Basic MathJax example with Latex</h2>
              <MathJax style={{fontSize:'30px'}}>{"\\(\\frac{10×10}{4x} = 2^{12}\\)"}</MathJax>
            <ButtonSecondary onClick={handleSolutionCloseModal}>Close</ButtonSecondary>
          </div>
        </Box>
      </Modal>
    </section>
  );
};

export default Expression;
