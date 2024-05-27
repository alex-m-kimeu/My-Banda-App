// import "./maindash.scss";
// import Chart from './chart/chart';
// import Featured from "./Featured/Featured";
// import Widget from "./widget/widget";
// import OrderComponent1 from '../ordercomponent';
import "./maindash1.scss";
import Chart1 from "./chart/chart1";
import Featured1 from "./Featured/Featured1";
import Widget1 from "./widget/widget1";



export const DelivererDash2 = ({ title, aspect }) => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget1 type="Orders"/>
          <Widget1 type="earning" />
          <Widget1 type="balance" />
        </div>
        <div className="charts">
          <div className="chartContainer">
            <Featured1 />
          </div>
          <div className="chartContainer">
            <Chart1 title={title} aspect={aspect} />
          </div>
        </div>
        
      </div>
    </div>
  );
};
