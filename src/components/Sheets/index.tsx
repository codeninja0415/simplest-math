"use client";
import React, { useState } from 'react';
import MathExpression from '../Expression/MathExpression';
import { ButtonPrimary } from '../Button.style';
import { Modal, Box, Typography, Button } from '@mui/material';

const Sheets = () => {
  const [numQuestions, setNumQuestions] = useState<number>(0);
  const [results, setResults] = useState<(number | null)[]>([]);
  const [marks, setMarks] = useState<number | null>(null);
  const [questions, setQuestions] = useState<{ numerator1: number; denominator1: number; numerator2: number; denominator2: number; }[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  // Function to generate questions
  const generateQuestions = (count: number) => {
    return Array.from({ length: count }, () => ({
      numerator1: Math.floor(Math.random() * 9) + 1,
      denominator1: Math.floor(Math.random() * 9) + 1,
      numerator2: Math.floor(Math.random() * 9) + 1,
      denominator2: Math.floor(Math.random() * 9) + 1,
    }));
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 6 && value <= 20) {
      setNumQuestions(value);
      setResults(Array(value).fill(null));
      setMarks(null); // Reset marks whenever the number of questions changes

      // Generate new set of questions
      setQuestions(generateQuestions(value));
    } else {
      setNumQuestions(0); // Reset if value is out of range
      setResults([]);
      setMarks(null);
      setQuestions([]); // Reset questions
    }
  };

  const handleSetResult = (index, result) => {
    const newResults = [...results];
    newResults[index] = result;
    setResults(newResults);
  };

  const checkAnswers = () => {
    let correctCount = 0;
    results.forEach((userResult, index) => {
      const { numerator1, denominator1, numerator2, denominator2 } = questions[index];
      const correctResult = (numerator1 * numerator2) / (denominator1 * denominator2);

      if (userResult !== null && Math.abs(userResult - correctResult) < 0.001) {
        correctCount++;
      }
    });
    setMarks(correctCount);
    setModalMessage(`You got ${correctCount} out of ${numQuestions} correct.`);
    handleResultOpenModal(); // Open modal to display results
  };

  const handleResultOpenModal = () => {
    setIsResultModalOpen(true);
  };
  
  const handleResultCloseModal = () => {
    setIsResultModalOpen(false);
    // Regenerate questions when closing the modal
    setQuestions(generateQuestions(numQuestions));
    setResults(Array(numQuestions).fill(null));
    setMarks(null); // Reset marks
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden bg-white dark:bg-gray-dark py-8">
        <div className="container">
          <div className="flex items-center justify-start gap-8 ">
            <h1 className="text-[24px] text-black dark:text-white">
              Generate Sheets:
            </h1>
            <div className='flex items-center justify-start gap-2'>
              <input 
                type="text"
                id="question-input"
                onChange={handleInputChange} 
                className="p-2 border rounded bg-white"
                autoComplete="off"
              />
              <label htmlFor="question-input" className="text-black dark:text-white italic text-red flex items-center ">
                Please provide numbers ranging from 6 to 20
              </label>
            </div>
          </div>

          {/* Generate Questions */}
          {numQuestions > 0 && (
            <>
              <div className="mt-8">
                {questions.map((question, index) => (
                  <div key={`${question.numerator1}-${question.denominator1}-${question.numerator2}-${question.denominator2}`} className="p-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="mb-4 text-lg text-black dark:text-white">Question {index + 1}:</h2>
                    <div className='bg-white rounded-lg py-8 px-4 flex items-center justify-start'>
                    <MathExpression
                      numerator1={question.numerator1}
                      denominator1={question.denominator1}
                      numerator2={question.numerator2}
                      denominator2={question.denominator2}
                      setResult={(result) => handleSetResult(index, result)}
                    />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Check Answers Button */}
          {numQuestions > 0 && (
            <>
              <ButtonPrimary onClick={checkAnswers} className="mt-8 p-2 bg-blue-500 text-white rounded">
                Check Total Mark
              </ButtonPrimary>
            </>
          )}
        </div>
      <Modal
        open={isResultModalOpen}
        onClose={handleResultCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ maxWidth: 500, padding: 4, backgroundColor: 'white', boxShadow: 24 }}>
          <Typography id="modal-title" variant="h6" component="h2" color='#4a6cf7'>
            Total Points
          </Typography>
          <Typography id="modal-description" sx={{ my: 4 }} color='red' fontSize={30}>
            {modalMessage}
          </Typography>
          <div className="flex gap-8">
            <Button onClick={handleResultCloseModal}>Try again</Button>
          </div>
        </Box>
      </Modal>
      </section>
    </>
  );
};

export default Sheets;
