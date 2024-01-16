import { Link } from "react-router-dom";
import "./notFound.scss";

const NotFound = () => {
  return (
    <div className="header">
      <div className="title">
        <h1>Oops...Page not found</h1>
      </div>
      <div className="subTitle">404</div>

      <Link to={"/"}>
        <button>back to home page</button>
      </Link>
    </div>
  );
};

export default NotFound;
