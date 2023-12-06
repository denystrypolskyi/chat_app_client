import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingSpinner = () => {
    return (
        <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={32}
            width={32}
            className="loader"
        />
    );
};

export default LoadingSpinner;
