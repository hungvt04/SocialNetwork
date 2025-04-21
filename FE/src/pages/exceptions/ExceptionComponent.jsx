import { useNavigate } from "react-router-dom";
import "./css/ExceptionComponent.css";

const ExceptionComponent = ({ title, subTitle, route, titleButton }) => {
  const navigate = useNavigate();

  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>{title}</h1>
        </div>
        <h2>{title}</h2>
        <p>{subTitle}</p>
        <button onClick={() => navigate(route)}>{titleButton}</button>
      </div>
	  </div>
  );
};

export default ExceptionComponent;
