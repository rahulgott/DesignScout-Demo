import { useDraggableArea } from '../../../hooks/useDraggableArea';
import styles from './styles.module.css';
import Rectangle from '../Rectangle';
import CurrentRectangle from '../CurrentRectangle';
import InputForm from '../InputForm';

interface ImageCardProps {
  src: string;
  altText: string;
}

export default function ImageCard({ src, altText }: ImageCardProps) {
  const {
    rectangles,
    selectedRectIndex,
    inputVisible,
    inputValue,
    inputPosition,
    currentRect,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    showInputOnClick,
    submitComment,
    setInputValue,
    setInputVisible,
  } = useDraggableArea();

  return (
    <div className={styles.card} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      <img src={src} alt={altText} className={styles.image} draggable="false" />
      {rectangles.map((rect, index) => (
        <Rectangle
          key={index}
          rect={rect}
          index={index}
          selectedRectIndex={selectedRectIndex}
          showInputOnClick={showInputOnClick}
        />
      ))}
      {currentRect && (
        <CurrentRectangle rect={currentRect} />
      )}
      {inputVisible && (
        <InputForm
          onSubmit={submitComment}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputPosition={inputPosition}
          setInputVisible={setInputVisible}
        />
      )}
    </div>
  );
};
