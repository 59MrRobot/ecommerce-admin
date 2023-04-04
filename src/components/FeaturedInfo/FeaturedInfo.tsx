import React, { useEffect, useState } from "react";
import "./FeaturedInfo.scss";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export const FeaturedInfo: React.FC = React.memo(
  () => {
    const [percentage, setPercentage] = useState(0);
    const [lastIncome, setLastIncome] = useState(0);
    const user = useSelector((state: any) => state.user.currentUser);

    useEffect(() => {
      const getIncome = async () => {
        try {
          const response = await userRequest.get("orders/income");
          const perc = (response.data[1].total) / (response.data[0].total) * 100;

          setLastIncome(response.data[1].total);
          setPercentage(Math.round(perc * 10) / 10);
        } catch (error) {

        }
      }

      getIncome();
    }, [user]);

    return (
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Revenue</span>

          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${lastIncome}</span>

            <span className="featuredMoneyRate">
              %{percentage}
              {(percentage < 0)
                ? (<ArrowDownwardIcon className="featuredIcon negative" />)
                : (<ArrowUpwardIcon className="featuredIcon positive" />)
              }
            </span>
          </div>

          <span className="featuredSub">Compared to last month</span>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">Sales</span>

          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$4,415</span>

            <span className="featuredMoneyRate">
              -1.4 <ArrowDownwardIcon className="featuredIcon negative"/>
            </span>
          </div>

          <span className="featuredSub">Compared to last month</span>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">Cost</span>

          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,225</span>

            <span className="featuredMoneyRate">
              +2.4 <ArrowUpwardIcon className="featuredIcon"/>
            </span>
          </div>

          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>
    );
  }
)
