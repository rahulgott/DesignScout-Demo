import React from 'react';
import styles from './styles.module.css';

interface RectangleProps {
    rect: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    index: number;
    selectedRectIndex: number | null;
    showInputOnClick: (index: number) => void;
  }
  
  const Rectangle: React.FC<RectangleProps> = ({ rect, index, selectedRectIndex, showInputOnClick }) => {
    return (
      <div>
        {selectedRectIndex === index && (
          <div
            className={styles.selectedRectangle}
            style={{
              
              position: 'absolute',
              left: `${rect.x}px`,
              top: `${rect.y}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              border: '1.2px dashed purple',
              pointerEvents: 'none',
            }}
          />
        )}
        <div
          className={styles.rectangleTrigger}
          style={{
            left: `${rect.x + rect.width}px`,
            top: `${rect.y + rect.height - 12}px`,
          }}
          onClick={() => showInputOnClick(index)}
        />
      </div>
    );
  };
  
  export default React.memo(Rectangle);
