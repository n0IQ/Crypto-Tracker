import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const CryptoTableInfo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        // console.log("cryptoData", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("Axios Error 💥");
        throw new AxiosError("Data did not get fetched");
      });
  }, []);

  const columns = [
    {
      Header: "#",
      accessor: "market_cap_rank",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "current_price",
      Cell: ({ value }) => {
        <p>$ {parseFloat(value.toFixed(2)).toLocaleString()}</p>;
      },
    },
    {
      Header: "Price Change (24h)",
      accessor: "price_change_percentage_24h",
      Cell: ({ value }) => {
        <p className="ss">{value}</p>;
      },
    },
    {
      Header: "Market Cap Change (24h)",
      accessor: "market_cap_change_percentage_24h",
    },
    {
      Header: "Market Cap",
      accessor: "market_cap",
    },
    {
      Header: "Circulating Supply",
      accessor: "circulating_supply",
    },
  ];

  // market_cap_rank, name, symbol image, current_price, market_cap, price_change_percentage_24h, market_cap_change_percentage_24h, circulating_supply

  return <div>CryptoTableInfo</div>;
};

export default CryptoTableInfo;
