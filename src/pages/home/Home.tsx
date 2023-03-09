import { Chart } from "../../components/chart";
import { FeaturedInfo } from "../../components/featuredInfo";
import "./home.scss";
import { userData } from "../../dummyData";
import { WidgetSm } from "../../components/widgetSm";
import { WidgetLg } from "../../components/widgetLg";
import React from "react";

export const Home: React.FC = React.memo(
  () => {
    return (
      <div className="home">
        <FeaturedInfo />

        <Chart
          data={userData} 
          title="User Analytics" 
          grid 
          dataKey="Active User"
        />

        <div className="homeWidgets">
          <WidgetSm/>

          <WidgetLg/>
        </div>
      </div>
    );
  }
)
