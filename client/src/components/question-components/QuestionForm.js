import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_QUESTION } from '../../utils/mutations';
import { GET_QUESTIONS } from '../../utils/queries';

const QuestionForm = () => {
    const [formQuestionText, setFormQuestionText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addQuestion, { error }] = useMutation(ADD_QUESTION, {
      refetchQueries: [{ query: GET_QUESTIONS }]
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setFormQuestionText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add question to database
          await addQuestion({
            variables: { question_text: formQuestionText }
          });
      
          // clear form value
          setFormQuestionText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
    };

    return (
        <div>
        <p className={` characterCount ${characterCount === 280 || error ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span> Something went wrong...</span>}
        </p>
        <div className="glass-background questionFormContainer">
            <form
                onSubmit={handleFormSubmit}>        
            <textarea
                placeholder="I have a question..."
                value={formQuestionText}
                className="form-input"
                onChange={handleChange}
            ></textarea>
                <button className="questionBtn glass-button" type="submit">
                Submit
                </button>
            </form>
        </div>
        </div>
    )
};

export default QuestionForm;