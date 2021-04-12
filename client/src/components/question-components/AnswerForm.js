import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ANSWER } from '../../utils/mutations';

const AnswerForm = ({ question_id }) => {
    const [answer_text, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addAnswer, { error }] = useMutation(ADD_ANSWER);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
    
        try {
          await addAnswer({
            variables: { answer_text, question_id }
          });
    
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
    };

    return (
        <div>
          <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className="ml-2">Something went wrong...</span>}
          </p>
          <div>
                <form
                    className="flex-row justify-center justify-space-between-md align-stretch"
                    onSubmit={handleFormSubmit}
                >
                    <textarea
                    placeholder="Provide an answer..."
                    value={answer_text}
                    className="form-input col-12"
                    onChange={handleChange}
                    ></textarea>
            
                    <button className="btn col-12" type="submit">
                    Submit
                    </button>
                </form>
            </div>
          {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default AnswerForm;