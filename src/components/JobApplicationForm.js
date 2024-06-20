import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import useValidation from '../hooks/useValidation';

const validate = (values) => {
    let errors = {};

    if (!values.fullName) {
        errors.fullName = 'Full Name is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Phone Number must be a 10-digit number';
    }

    if ((values.position === 'Developer' || values.position === 'Designer') && (!values.relevantExperience || values.relevantExperience <= 0)) {
        errors.relevantExperience = 'Relevant Experience is required and must be a number greater than 0';
    }

    if (values.position === 'Designer' && !values.portfolioURL) {
        errors.portfolioURL = 'Portfolio URL is required';
    } else if (values.position === 'Designer' && !/^https?:\/\/.+\..+/.test(values.portfolioURL)) {
        errors.portfolioURL = 'Portfolio URL is invalid';
    }

    if (values.position === 'Manager' && !values.managementExperience) {
        errors.managementExperience = 'Management Experience is required';
    }

    if (!values.additionalSkills.length) {
        errors.additionalSkills = 'At least one skill must be selected';
    }

    if (!values.interviewTime) {
        errors.interviewTime = 'Preferred Interview Time is required';
    }

    return errors;
};

const JobApplicationForm = () => {
    const initialValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioURL: '',
        managementExperience: '',
        additionalSkills: [],
        interviewTime: '',
    };

    const [values, handleChange] = useForm(initialValues);
    const [submitted, setSubmitted] = useState(false);
    const [errors, handleSubmit] = useValidation(values, validate, setSubmitted);

    const displaySummary = (values) => {
        return (
            <div className="summary">
                <h3>Summary</h3>
                <p>Full Name: <span className="highlight">{values.fullName}</span></p>
                <p>Email: <span className="highlight">{values.email}</span></p>
                <p>Phone Number: <span className="highlight">{values.phoneNumber}</span></p>
                <p>Position: <span className="highlight">{values.position}</span></p>
                {(values.position === 'Developer' || values.position === 'Designer') && (
                    <p>Relevant Experience: <span className="highlight">{values.relevantExperience} years</span></p>
                )}
                {values.position === 'Designer' && (
                    <p>Portfolio URL: <span className="highlight">{values.portfolioURL}</span></p>
                )}
                {values.position === 'Manager' && (
                    <p>Management Experience: <span className="highlight">{values.managementExperience}</span></p>
                )}
                <p>Additional Skills: <span className="highlight">{values.additionalSkills.join(', ')}</span></p>
                <p>Preferred Interview Time: <span className="highlight">{values.interviewTime}</span></p>
            </div>
        );
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let newSkills = [...values.additionalSkills];
        if (checked) {
            newSkills.push(name);
        } else {
            newSkills = newSkills.filter(skill => skill !== name);
        }
        handleChange({
            target: {
                name: 'additionalSkills',
                value: newSkills,
            },
        });
    };

    return (
        <div>
            <h1>Job Application Form</h1>
            {submitted ? (
                displaySummary(values)
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <p className="error">{errors.fullName}</p>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>
                    <div>
                        <label>Applying for Position:</label>
                        <select
                            name="position"
                            value={values.position}
                            onChange={handleChange}
                        >
                            <option value="">Select a position</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    {(values.position === 'Developer' || values.position === 'Designer') && (
                        <div>
                            <label>Relevant Experience (years):</label>
                            <input
                                type="number"
                                name="relevantExperience"
                                value={values.relevantExperience}
                                onChange={handleChange}
                            />
                            {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
                        </div>
                    )}
                    {values.position === 'Designer' && (
                        <div>
                            <label>Portfolio URL:</label>
                            <input
                                type="text"
                                name="portfolioURL"
                                value={values.portfolioURL}
                                onChange={handleChange}
                            />
                            {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
                        </div>
                    )}
                    {values.position === 'Manager' && (
                        <div>
                            <label>Management Experience:</label>
                            <input
                                type="text"
                                name="managementExperience"
                                value={values.managementExperience}
                                onChange={handleChange}
                            />
                            {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
                        </div>
                    )}
                    <div>
                        <label>Additional Skills:</label>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="JavaScript"
                                    checked={values.additionalSkills.includes('JavaScript')}
                                    onChange={handleCheckboxChange}
                                />
                                JavaScript
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="CSS"
                                    checked={values.additionalSkills.includes('CSS')}
                                    onChange={handleCheckboxChange}
                                />
                                CSS
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Python"
                                    checked={values.additionalSkills.includes('Python')}
                                    onChange={handleCheckboxChange}
                                />
                                Python
                            </label>
                            {/* Add more skills as needed */}
                        </div>
                        {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
                    </div>
                    <div>
                        <label>Preferred Interview Time:</label>
                        <input
                            type="datetime-local"
                            name="interviewTime"
                            value={values.interviewTime}
                            onChange={handleChange}
                        />
                        {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default JobApplicationForm;
