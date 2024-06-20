import { useState } from 'react';

const useValidation = (values, validate, setSubmitted) => {
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setSubmitted(true);
        }
    };

    return [errors, handleSubmit];
};

export default useValidation;
