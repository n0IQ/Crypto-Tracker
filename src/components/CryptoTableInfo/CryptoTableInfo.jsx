import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import CryptoTable from "../CryptoTable/CryptoTable";
import "./CryptoTableInfoStyles.css";

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
      Cell: ({ value, row }) => {
        return (
          <p className="nameCell">
            <img className="cryptoImage" src={row.original.image} alt={value} />
            {value}
            <span className="cryptoSymbol">
              {row.original.symbol.toUpperCase()}
            </span>
          </p>
        );
      },
    },
    {
      Header: "Price",
      accessor: "current_price",
      Cell: ({ cell: { value } }) => {
        <p className="priceCell">
          $ {parseFloat(value.toFixed(2)).toLocaleString()}
        </p>;
      },
    },
    {
      Header: "Price Change (24h)",
      accessor: "price_change_percentage_24h",
      Cell: ({ cell: { value } }) => {
        <p className={value >= 0 ? "risePercentage" : "dropPercentage"}>
          {value}
        </p>;
      },
    },
    {
      Header: "Market Cap Change (24h)",
      accessor: "market_cap_change_percentage_24h",
      Cell: ({ cell: { value } }) => {
        <p className={value >= 0 ? "risePercentage" : "dropPercentage"}>
          {value}
        </p>;
      },
    },
    {
      Header: "Market Cap",
      accessor: "market_cap",
      Cell: ({ cell: { value } }) => {
        <p>{value}</p>;
      },
    },
    {
      Header: "Circulating Supply",
      accessor: "circulating_supply",
      Cell: ({ cell: { value } }) => {
        <p>{value}</p>;
      },
    },
  ];

  // market_cap_rank, name, symbol image, current_price, market_cap, price_change_percentage_24h, market_cap_change_percentage_24h, circulating_supply

  return <CryptoTable columns={columns} data={data} />;
};

export default CryptoTableInfo;
