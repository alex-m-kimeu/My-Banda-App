import "./maindash.scss";
import Chart from './chart/chart';
import Featured from "./Featured/Featured";
import Widget from "./widget/widget";
import OrderComponent from '../../Orders/Orders';

export const SellerDash2 = ({ title, aspect }) => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="Products"/>
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <div className="chartContainer">
            <Featured />
          </div>
          <div className="chartContainer">
            <Chart title={title} aspect={aspect} />
          </div>
        </div>
        <div className="listContainer">
          <OrderComponent />
        </div>
      </div>
    </div>
  );
};
