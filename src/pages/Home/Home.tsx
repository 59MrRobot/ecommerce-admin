import { Chart } from "../../components/Chart";
import { FeaturedInfo } from "../../components/FeaturedInfo";
import "./Home.scss";
import { WidgetSm } from "../../components/WidgetSm";
import { WidgetLg } from "../../components/WidgetLg";
import React, { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export const Home: React.FC = React.memo(
  () => {
    const [userStats, setUserStats] = useState<{
      index: number,
      name: string;
      "Active User": number,
    }[]>([]);

    const MONTHS = useMemo(
      () => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      []
    );

    useEffect(() => {
      const getStats = async () => {
        try {
          const response = await userRequest.get('users/stats');

          response.data.map((stat: UserStat) => {
            setUserStats((prev) => [
              ...prev,
              {
                index: stat._id,
                name: MONTHS[stat._id - 1],
                "Active User": stat.total,
              },
            ])

            return 0;
          })
        } catch (error) {
          
        }
      }

      getStats();
    }, [MONTHS]);
    
    return (
      <div className="home">
        <FeaturedInfo />

        <Chart
          data={userStats}
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
