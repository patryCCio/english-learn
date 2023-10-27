import "../styles/svg.css";

const TrashPS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="1em" width="1em" onClick={onClick}>
            <g className="cls-trash-bottom">
                <path className="cls-1" d="m48.57,62.25h102.87v84.58c0,16.73-13.58,30.31-30.31,30.31h-42.25c-16.73,0-30.31-13.58-30.31-30.31V62.25h0Z" />
                <line className="cls-1" x1="76.21" y1="177.02" x2="76.21" y2="62.25" />
                <line className="cls-1" x1="122.74" y1="177.08" x2="122.74" y2="62.31" />

            </g>
            <g className="cls-trash-top">
                <path className="cls-1 cls-trash-top" d="m106.45,34.02c.48-.71.76-1.57.76-2.5,0-2.48-2.01-4.49-4.49-4.49h-5.45c-2.48,0-4.49,2.01-4.49,4.49,0,.92.28,1.78.76,2.5-25.36.63-44.98,4.95-44.98,10.19v6.04h102.87v-6.04c0-5.24-19.63-9.56-44.99-10.19Z" />
            </g>
        </svg>
    );
}

export default TrashPS;