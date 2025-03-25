import { HTMLAttributes, memo, useEffect, useRef, useState } from "react"
import Loader from "./UI/Loader/loader"

interface Props extends HTMLAttributes<HTMLDivElement>{
    loading: boolean
}

const LoadingComponent = memo(({loading, children, ...props}: Props) => {
    const [height, setHeight] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.clientHeight);
        }
    }, [loading, children]);

    return (
        <>
            {loading ? (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center",
                        height: height || 'auto', // Устанавливаем высоту
                    }}
                >
                    <Loader styles={props.style} />
                </div>
            ) : (
                <div ref={contentRef}>{children}</div>
            )}
        </>
    );
})

export default LoadingComponent