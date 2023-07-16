const SingleQuestion = (
    {
        onAnswer,
        selectedOption = null,
        question = {
            "_id": "0",
            "title": "",
            "options": []
        },
    }) => {

    const onChange = radioIndex => () => {
        onAnswer(radioIndex)
    }
    return (
        <div className={'question-holder'}>
            <div className={'question-title'}>{question.title}</div>
            {question.options.map((option, index) => {
                const unique = `${question['_id']}_${index}`
                return (
                    <div>
                        <input
                            onChange={onChange(index)}
                            id={unique}
                            name={question['_id']}
                            type="radio"
                            checked={selectedOption === index}
                            value={option['correct'] + ''} />
                        <label htmlFor={unique}>{option.title}</label>
                    </div>)
                }
            )}
        </div>
    )
}
export default SingleQuestion
