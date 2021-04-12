import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_QUESTION } from '../../utils/mutations';
import { GET_QUESTIONS } from '../../utils/queries';

const QuestionForm = ({ questions }) => {
    const [question_text, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addQuestion, { error }] = useMutation(ADD_QUESTION, {
        update(cache, { data: { addQuestion } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { questions } = cache.readQuery({ query: GET_QUESTIONS });
            cache.writeQuery({
              query: GET_QUESTIONS,
              data: { questions: [addQuestion, ...questions] }
            });
          } catch (e) {
            console.error(e);
          }
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add question to database
          await addQuestion({
            variables: { question_text }
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
        <div className="glass-background p-4">
            <form className="flex-row justify-center justify-space-around-md align-stretch"
                onSubmit={handleFormSubmit}>        
            <textarea
                placeholder="I have a question..."
                value={question_text}
                className="form-input col-12"
                onChange={handleChange}
            ></textarea>
                <button className="btn col-12 glass-button" type="submit">
                Submit
                </button>
            </form>
        </div>
        </div>
    )
};

export default QuestionForm;