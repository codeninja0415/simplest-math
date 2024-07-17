"use client";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import MathExpression from "./MathExpression";
import Decimal from 'decimal.js';
import { ButtonPrimary, ButtonSecondary } from "../Button.style";
import { Modal, Box, Typography, IconButton, ButtonGroup, Button } from '@mui/material';
import { MathJax } from 'better-react-mathjax';
import { simplifyFraction } from "@/utils/symplifyFraction";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

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
const EMPTY_RESULT_TEXT = 'Please enter a result.'
type Level = 'simple' | 'easy' | 'medium' | 'hard';

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
  const [level, setLevel] = useState<Level>('simple');

  useEffect(() => {
    generateRandomFractions();
  }, [level]);

  useEffect(() => {
    const num1 = new Decimal(numerator1);
    const den1 = new Decimal(denominator1);
    const num2 = new Decimal(numerator2);
    const den2 = new Decimal(denominator2);

    const calcAnswer = num1.div(den1).mul(num2.div(den2));
    setAnswer(calcAnswer.toNumber());
  }, [numerator1, denominator1, numerator2, denominator2]);

  const generateRandomFractions = () => {
    let max = 9;
    if (level === "easy") max = 30;
    if (level === "hard") max = 99;

    let min = 1;
    if (level === "medium" || level === "hard") min = -max;

    setNumerator1(Math.floor(Math.random() * (max - min + 1)) + min);
    setDenominator1(Math.floor(Math.random() * (max - min + 1)) + min);
    setNumerator2(Math.floor(Math.random() * (max - min + 1)) + min);
    setDenomiator2(Math.floor(Math.random() * (max - min + 1)) + min);
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
      setModalMessage(EMPTY_RESULT_TEXT);
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

  const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numerator1 * numerator2, denominator1 * denominator2);

  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Expression"
          paragraph="Explore fractions and see how parts make up a whole. Practice multiplying fractions in our Playground."
          center
        />
        <div className="w-full flex items-center justify-start mb-4">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              size="large"
              onClick={() => setLevel("simple")}
              sx={{
                backgroundColor: level === "simple" ? '#d3d3d3' : 'transparent',
              }}
            >
              Simple
            </Button>
            <Button
              size="large"
              onClick={() => setLevel("easy")}
              sx={{
                backgroundColor: level === "easy" ? '#d3d3d3' : 'transparent',
              }}
            >
              Easy
            </Button>
            <Button
              size="large"
              onClick={() => setLevel("medium")}
              sx={{
                backgroundColor: level === "medium" ? '#d3d3d3' : 'transparent',
              }}
            >
              Medium
            </Button>
            <Button
              size="large"
              onClick={() => setLevel("hard")}
              sx={{
                backgroundColor: level === "hard" ? '#d3d3d3' : 'transparent',
              }}
            >
              Hard
            </Button>
          </ButtonGroup>

        </div>
        <div className="flex flex-col flex-full bg-white rounded-lg pt-24 pb-12 px-12 gap-16">
          <MathExpression
            key={`${numerator1??1}-${denominator1??2}-${numerator2??3}-${denominator2??4}`}
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
        <div className="flex items-center justify-start rounded-md gap-2 py-4 mt-4 bg-[#e8e8f3] border-l-4 border-primary ">
          <IconButton>
            <PlayCircleIcon />
          </IconButton>
          <div className="text-black">
            View Our Tutorial - Quick tips to complete this exercise
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
          <div className="flex flex-col gap-8">
            <h2>Solution:</h2>
            <div className="flex flex-col gap-4">
              <MathJax style={{ fontSize: '24px', color: '#000' }}>{`\\(=\\frac{${numerator1}}{${denominator1}} × \\frac{${numerator2}}{${denominator2}} \\)`}</MathJax>
              <MathJax style={{ fontSize: '24px', color: '#000' }}>{`\\(=\\frac{${numerator1} × ${numerator2}}{${denominator1} × ${denominator2}}\\)`}</MathJax>
              <MathJax style={{ fontSize: '24px', color: '#000' }}>{`\\(=\\frac{${numerator1 * numerator2}}{${denominator1 * denominator2}}\\)`}</MathJax>
              {simplifiedNumerator !== numerator1 * numerator2 &&
                <MathJax style={{ fontSize: '24px', color: '#000' }}>{`\\(=\\frac{${simplifiedNumerator}}{${simplifiedDenominator}}\\)`}</MathJax>
              }
            </div>
            <ButtonSecondary onClick={handleSolutionCloseModal}>Close</ButtonSecondary>
          </div>
        </Box>
      </Modal>
    </section>
  );
};

export default Expression;
