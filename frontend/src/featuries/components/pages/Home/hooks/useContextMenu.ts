import { useCallback, useState } from "react";

export default function useContextMenu(){
    const [showTools, setShowTools] = useState(false)
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    // Обработчик событий для клика
    const handleContextMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        const x = event.clientX;
        const y = event.clientY;
        setCoordinates({ x, y });
        setShowTools(true)
    }, []);

    return {handleContextMenu, showTools, coordinates, setShowTools}
}