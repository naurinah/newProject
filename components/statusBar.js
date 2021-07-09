import BarChartIcon from "@material-ui/icons/BarChart";
import { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";

const StatusBar = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [newCustomer, setNewCustomer] = useState(0);
  const [dangerApi, setDangerApi] = useState(null);

  const fetchTotalOrders = async () => {
    const response = await fetch(
      "http://bigazure.com/api/json_v4/dashboard/API_PORTAL_API/api_totalOrders.php"
    ).then((res) => res.json());
    console.log(response[0].TotalOrders);
    setTotalOrders(response[0].TotalOrders);
    setNewCustomer(response[0].NewCustomers);
  };
  const fetchDangerApi = async () => {
    const response = await fetch(
      "http://bigazure.com/api/json_v4/dashboard/API_PORTAL_API/api_tophits.php"
    ).then((res) => res.json());
    setDangerApi(response);
    console.log(response);
  };
  const MINUTE_MS = 30000;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await fetchTotalOrders();
    await fetchDangerApi();
    const interval = setInterval(async () => {
      await fetchTotalOrders();
      await fetchDangerApi();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="p-8 flex gap-4">
      <div className="bg-white shadow-sm rounded-md flex p-4 gap-4 items-center border-b-2 border-green-500 flex-1">
        <div className="bg-green-500 rounded-full h-[2.5rem] w-[2.5rem] flex justify-center items-center">
          <BarChartIcon className="text-white" />
        </div>
        <div>
          <p className="text-gray-500 mb-[-0.8rem] font-light">
            SHIPMENTS TODAY
          </p>
          <p className="text-green-500 font-bold text-[2.5rem]">
            {totalOrders}
          </p>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-md flex p-4 gap-4 items-center border-b-2 border-green-500 flex-1">
        <div className="bg-green-500 rounded-full h-[2.5rem] w-[2.5rem] flex justify-center items-center">
          <BarChartIcon className="text-white" />
        </div>
        <div>
          <p className="text-gray-500 mb-[-0.8rem] font-light">New Customer</p>
          <p className="text-green-500 font-bold text-[2.5rem]">
            {newCustomer}
          </p>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-md flex p-4 gap-4 items-center border-b-2 border-green-500 flex-1">
        <div className="bg-green-500 rounded-full h-[2.5rem] w-[2.5rem] flex justify-center items-center">
          <BarChartIcon className="text-white" />
        </div>
        <div>
          <p className="text-gray-500  font-light">DANGER API</p>
          <p className="text-green-500 font-bold text-[2.5rem]">
            {dangerApi &&
              dangerApi.map((e) => (
                <p
                  className="text-[#f83245] font-semibold text-sm"
                  key={e.api_no}
                >
                  {e.api_name} (
                  <CurrencyFormat
                    value={e.Total_hits}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  ) Hits
                </p>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
