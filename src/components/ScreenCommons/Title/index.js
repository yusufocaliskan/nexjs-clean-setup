import VerticalDivider from "../VerticalDiverder";
import "./style.scss";
const Title = ({ text, desc, addDivider = false }) => {
  return (
    <>
      <h1 className="sign-in-to-hepbit">{text}</h1>
      {addDivider && <VerticalDivider />}
      {desc && <p class="title-desc">{desc}</p>}
    </>
  );
};

export default Title;
