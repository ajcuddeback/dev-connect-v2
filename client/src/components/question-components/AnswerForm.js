import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_QUESTIONS } from '../../utils/queries';
import { ADD_ANSWER } from '../../utils/mutations';

const AnswerForm = ({ id }) => {
  const [formAnswerText, setFormAnswerText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addAnswer, { error }] = useMutation(ADD_ANSWER, {
    refetchQueries: [{ query: GET_QUESTIONS }]
  });

  const handleChange = event => {
      if (event.target.value.length <= 280) {
        setFormAnswerText(event.target.value);
        setCharacterCount(event.target.value.length);
      }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await addAnswer({
        variables: { answer_text: formAnswerText, question_id: id }
      });
    
      // clear form value
      setFormAnswerText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
      </p>
      <div>
        <form
          className="questionFormContainer"
          onSubmit={handleFormSubmit}
          >
          <textarea
            placeholder="Provide an answer..."
            value={formAnswerText}
            className="form-input"
            onChange={handleChange}
            ></textarea>
              <button className="questionBtn glass-button" type="submit">
                Submit
              </button>
        </form>
      </div>
        {error && <div>Something went wrong...</div>}
      </div>
    );
};

export default AnswerForm;