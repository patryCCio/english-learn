import "../styles/svg.css";

const AddPS = ({ className, onClick }) => {
    return (
        <svg className={"svg-icons-ps " + className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="1em" width="1em" onClick={onClick}>
            <g className="cls-add">
                <circle className="cls-1" cx="100" cy="100" r="90.89" />
                <line className="cls-1" x1="100" y1="161.78" x2="100" y2="38.22" />
                <line className="cls-1" x1="38.22" y1="100" x2="161.78" y2="100" />
            </g>
        </svg>
    );
}

export default AddPS;