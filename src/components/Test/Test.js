import { getQuestions } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Empty from '../Empty'
import SingleQuestion from '../SingleQuestion'


const Test = () => {
    const [answers, setAnswers] = useState({})
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [done, setDone] = useState(false)
    const dispatch = useDispatch()
    const questions = useSelector(( { questions }) => questions )

    const onAnswer = optionIndex => setAnswers({...answers, [currentQuestion]:optionIndex})

    const hasAnswer = () => answers[currentQuestion] !== undefined
    const showDone = () => currentQuestion === questions.length - 1

    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])

    if (questions.length === 0) return <Empty />

    if (done) {
        const oneQGrade = 100 / questions.length
        let grade = 0
        questions.forEach((question, index) => {
            grade+= question.options[answers[index]]['correct'] ? oneQGrade : 0
        })
        grade = Math.round(grade)

        return (
            <div className={'hold-test'}>
                <div className={'question-number'}>Your score is <strong>{ grade }</strong></div>
                <div className={'question-holder'}>
                    <div className={'question-title'}>I tried finnish it as fast as possible so:</div>
                    <ul>
                        <li>No fancy CSS (sass / module)</li>
                        <li>No scalability thoughts</li>
                        <li>Quick and dirty</li>
                        <li>Not too much separation of logic etc. </li>
                    </ul>
                </div>
                <div className={'test-buttons'}>
                    <input
                        type={'button'}
                        value={'Thanks'}
                        onClick={() => document.location.href = "/"}
                    />
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={'hold-test'}>
                <div className={'question-number'}>This is Question No. { currentQuestion + 1 }</div>
                <SingleQuestion
                    onAnswer={onAnswer}
                    question={questions[currentQuestion]}
                    selectedOption={answers[currentQuestion]}
                />
                <div className={'test-buttons'}>
                    <input
                        type={'button'}
                        disabled={currentQuestion === 0}
                        value={'Previous'}
                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    />
                    <input
                        type={'button'}
                        disabled={!hasAnswer()  }
                        value={showDone() ? 'Done': 'Next'}
                        onClick={showDone() ?
                            () => setDone(true) :
                            () => setCurrentQuestion(currentQuestion + 1)
                        }
                    />
                </div>
            </div>
        )
    }
}
export default Test
