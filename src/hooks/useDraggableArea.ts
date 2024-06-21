import { useCallback, useState } from 'react';

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  comment: string;
  time: number;
  index: number;
}

export function useDraggableArea() {
    const [rectangles, setRectangles] = useState<Rectangle[]>([])
    const [currentRect, setCurrentRect] = useState<Rectangle | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null)
    const [inputVisible, setInputVisible] = useState(false)
    const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 })
    const [selectedRectIndex, setSelectedRectIndex] = useState<number | null>(null)
    const [inputValue, setInputValue] = useState("")

    const updateRectangles = useCallback((newRect: Rectangle) => {
        setRectangles(prev => [...prev, newRect])
        setSelectedRectIndex(prev => prev === null ? 0 : prev + 1)
    }, []);

    const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const inputArea = (e.target as HTMLElement).closest('.input-area')

        if (inputVisible && !inputArea) {
            submitComment(inputValue.trim())
            setInputVisible(false)
            setInputValue("")
            if (selectedRectIndex != null) {
                setRectangles(prev => prev.filter((_, index) => index !== selectedRectIndex))
            }
        } else {
            const { left, top } = e.currentTarget.getBoundingClientRect()
            setStartPosition({
                x: e.clientX - left,
                y: e.clientY - top,
            })
            setIsDragging(true)
            setCurrentRect(null)
        }
    }, [inputVisible, inputValue, selectedRectIndex]);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !startPosition) return;

        const { left, top } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left
        const y = e.clientY - top

        const width = Math.abs(x - startPosition.x)
        const height = Math.abs(y - startPosition.y)

        if (width > 12 || height > 12) {
            setCurrentRect({
                x: Math.min(startPosition.x, x),
                y: Math.min(startPosition.y, y),
                width,
                height,
                comment: "",
                time: Date.now(),
                index: rectangles.length
            });
        }
    }, [isDragging, startPosition, rectangles.length]);

    const onMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (currentRect && (currentRect.width > 12 || currentRect.height > 12)) {
            updateRectangles({ ...currentRect, comment: inputValue })
            setInputPosition({
                x: e.clientX - e.currentTarget.getBoundingClientRect().left,
                y: e.clientY - e.currentTarget.getBoundingClientRect().top
            })
            setInputVisible(true)
            setInputValue("")
        }
        setIsDragging(false)
        setCurrentRect(null)
        setStartPosition(null)
    }, [currentRect, inputValue, updateRectangles])

    const submitComment = useCallback((comment: string) => {
        if (selectedRectIndex != null && comment) {
            setRectangles(prev => prev.map((rect, index) => index === selectedRectIndex ? { ...rect, comment, time: Date.now() } : rect))
            setInputVisible(false)
        }
    }, [selectedRectIndex])

    const showInputOnClick = useCallback((index: number) => {
        const rect = rectangles[index]
        setInputPosition({ x: rect.x + rect.width, y: rect.y + rect.height })
        setInputVisible(true)
        setSelectedRectIndex(index)
        setInputValue(rect.comment)
    }, [rectangles])

    return {
        rectangles, currentRect, onMouseDown, onMouseMove, onMouseUp, inputVisible, setInputVisible, inputPosition, submitComment, showInputOnClick, inputValue, setInputValue, selectedRectIndex
    }
}
