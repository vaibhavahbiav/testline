import React, { useEffect, useState } from 'react'
import quizData from '../Files/quiz.json'

function QuizLocalComponent() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState(quizData.questions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            // API STUFF
            // try {
            //     const response = await fetch('https://api.jsonserve.com/Uw5CrX');
            //     const data = await response.json();
            //     setQuestions(data.questions);
            // } catch (error) {
            //     console.error('Error fetching quiz questions:', error);
            // }
        };

        if (quizStarted) {
            fetchQuestions();
        }
    }, [quizStarted]);

    const handleAnswer = (answer) => {
        const correctAnswer = questions[currentQuestionIndex]?.options.find((option) => option.is_correct);

        if (answer === correctAnswer?.description) {
            setScore(score + 10);
        }
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const resultMessage = score >= 60 ? 'Pass' : 'Fail';

    const restartQuiz = () => {
        setQuizStarted(false);
        // setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinished(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative">
            <div className='absolute top-[5vh] left-1/2 -translate-x-1/2'>
                <h1 className='z-[2] text-6xl font-bold tracking-widest bg-gray-100 py-4 px-10 text-gray-900'><span className='bg-gradient-to-r from-blue-500 from-50% to-blue-400 inline-block text-transparent bg-clip-text'>Testline</span> Assignment</h1>
            </div>
            {!quizStarted && !quizFinished && (
                <div className='flex flex-col space-y-5 items-center justify-center bg-gradient-to-tr from-gray-100 from-80% to-blue-200 rounded-xl py-10 px-20 shadow-xl '>
                    <h1 className='text-4xl text-gray-900 tracking-wide font-bold'>Test</h1>
                    <h2 className='text-2xl font-bold text-gray-900 tracking-wide'>Title : <span className='underline underline-offset-4 text-blue-500'>{quizData.title}</span></h2>
                    <h3 className=' text-xl font-bold text-gray-900 tracking-wide'>Topic : {quizData.topic}</h3>
                    <button
                        onClick={() => setQuizStarted(true)}
                        className="bg-gradient-to-tr from-blue-500 from-50% to-blue-300 text-blue-100 px-6 py-2 rounded-lg text-xl font-bold shadow-lg hover:scale-95 hover:transition-all duration-200"
                    >
                        Start Test
                    </button>
                </div>
            )}

            {quizStarted && !quizFinished && questions.length > 0 && (
                <div className="px-20 py-10 bg-gradient-to-tr from-gray-100 from-80% to-blue-200 shadow-xl rounded-xl w-[60vw] select-none">
                    <h2 className="text-2xl mb-4"><span className='text-blue-500 font-bold'>{currentQuestionIndex + 1}.&nbsp;</span>{questions[currentQuestionIndex]?.description}</h2>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-2 mt-5">
                        {questions[currentQuestionIndex]?.options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(option.description)}
                                className="w-full bg-gray-200 p-2 rounded-lg group hover:bg-blue-500 text-gray-900"
                            >
                                <div className='flex space-x-2 items-center justify-center'><span className='text-blue-500 font-bold group-hover:text-gray-100'>{i + 1}.&nbsp;</span><span className='group-hover:text-gray-900'>{option.description}</span></div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {quizFinished && (
                <div className={`w-full max-w-md py-10 px-20 bg-gradient-to-tr from-gray-100 from-80%  shadow-xl rounded-xl text-center flex flex-col items-center justify-center ${resultMessage === 'Pass' ? 'to-green-200' : 'to-red-200'}`}>
                    <h2 className="text-4xl font-bold text-blue-500">Test Finished!</h2>
                    <span className="mt-5 text-xl">score: <span className={`font-bold ${resultMessage === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>{score}</span></span>
                    <span className={`mt-1 font-bold text-3xl ${resultMessage === 'Pass' ? 'text-green-500' : 'text-red-500'}`}>You {resultMessage}ed.</span>
                    <button
                        onClick={restartQuiz}
                        className="mt-5 bg-gradient-to-tr from-blue-500 from-50% to-blue-300 text-blue-100 px-6 py-2 rounded-lg text-xl font-bold shadow-lg hover:scale-95 hover:transition-all duration-200"
                    >
                        {resultMessage === 'Fail' ? 'Try Again?' : 'Beat Score!'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizLocalComponent
