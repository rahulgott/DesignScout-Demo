import React from 'react';
import styles from './styles.module.css';

interface CurrentRectangleProps {
    rect: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }
  
  const CurrentRectangle: React.FC<CurrentRectangleProps> = ({ rect }) => {
    return (
      <div
        className={styles.currentRectangle}
        style={{
          left: `${rect.x}px`,
          top: `${rect.y}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        }}
      />
    );
  };
  
  export default React.memo(CurrentRectangle);