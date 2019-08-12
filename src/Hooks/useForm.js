import { useState } from 'react';

const useForm = (callback, initialState) => {

  const [values, setValues] = useState(initialState);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = (event) => {
    event.persist();
    setValues(state => ({ ...state, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
