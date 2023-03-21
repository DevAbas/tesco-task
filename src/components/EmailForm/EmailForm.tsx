import { useState } from "react";

import styles from "./EmailForm.module.css";

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidEmail(email) && email.endsWith("@gmail.com")) {
      setIsValid(true);
      onSubmit(email);
    } else {
      setIsValid(false);
    }
  };

  const isValidEmail = (email: string) => {
    // Use a regular expression to validate the email address
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <label htmlFor="email" className={styles.labelText}>
        Enter your email address:
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleChange}
        className={styles.input}
      />

      {!isValid && <p>Please enter a valid email address.</p>}
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default EmailForm;
