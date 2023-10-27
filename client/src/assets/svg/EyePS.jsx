import "../styles/svg.css";

const EyePS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187.39 144.43" height="1em" width="1em" onClick={onClick}>
            <path className="cls-1 eye1-ps" d="m93.7,31.14C45.69,31.14,6.78,72.22,6.78,72.22c0,0,38.91,41.07,86.91,41.07s86.91-41.07,86.91-41.07c0,0-38.91-41.07-86.91-41.07Z" />
            <circle className="cls-1 eye2-ps" cx="93.7" cy="72.22" r="41.07" />
            <circle className="cls-1 eye3-ps" cx="93.7" cy="72.22" r="14.58" />
            <line className="cls-1 eye4-ps" x1="27.96" y1="137.96" x2="159.43" y2="6.48" />
        </svg>
    );
}

export default EyePS;