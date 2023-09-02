import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const handleChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleReset = () => setFormState(initialForm);

  return {
    ...formState,
    setFormState,
    formState,
    handleChange,
    handleReset,
  };
};
