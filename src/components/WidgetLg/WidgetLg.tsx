import React, { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import "./WidgetLg.scss";
import { format } from 'timeago.js';
import { Loader } from "../Loader";

export const WidgetLg: React.FC = React.memo(
  () => {
    const Button = ({ type }: { type: string }) => {
      return <button className={"widgetLgButton " + type}>{type}</button>;
    };

    const [orders, setOrders] = useState<Order[] | []>([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
      const getOrders = async () => {
        try {
          setIsFetching(true);

          const response = await userRequest.get("orders");

          setOrders(response.data);

          setIsFetching(false);
        } catch (error) {
          console.log(error);
        }
      }

      getOrders();
    }, []);

    return (
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Latest transactions</h3>
        <table className="widgetLgTable">
          {isFetching
            ? (<Loader />)
            : (
              <tbody>
                <tr className="widgetLgTr">
                  <th className="widgetLgTh">Customer</th>
                  <th className="widgetLgTh">Date</th>
                  <th className="widgetLgTh">Amount</th>
                  <th className="widgetLgTh">Status</th>
                </tr>
                {orders.map(order => (
                  <tr className="widgetLgTr" key={order._id}>
                    <td className="widgetLgUser">
                      <span className="widgetLgName">{order.userId}</span>
                    </td>
                    <td className="widgetLgDate">{format(order.createdAt)}</td>
                    <td className="widgetLgAmount">${order.amount}</td>
                    <td className="widgetLgStatus">
                      <Button type={order.status[0].toUpperCase() + order.status.slice(1)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            )
          }
        </table>
      </div>
    );
  }
)
