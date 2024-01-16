/* eslint-disable react/prop-types */
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ size }) => {
  return (
    <>
      <ClipLoader color="#36d7b7" size={size} />
    </>
  );
};

export default Spinner;
