import React, { FormEvent } from 'react';
import styles from './styles.module.css';

interface InputFormProps {
  onSubmit: (inputValue: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  inputPosition: { x: number; y: number };
  setInputVisible: (visible: boolean) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, inputValue, setInputValue, inputPosition, setInputVisible }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputForm} style={{ left: `${inputPosition.x}px`, top: `${inputPosition.y - 10}px` }}>
      <input
        className="input-class-name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your thoughts"
        autoFocus
        type="text"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default React.memo(InputForm);
