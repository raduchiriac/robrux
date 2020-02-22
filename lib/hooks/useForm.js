import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsSubmitting(false);
      callback();
    }
  }, [errors, callback, isSubmitting]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event, target) => {
    if (typeof event == 'object' && event.target) {
      event.persist();
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    } else if (target) {
      // This allows you to use handleChange(2, 'myAge');
      setValues(values => ({ ...values, [target]: event }));
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
