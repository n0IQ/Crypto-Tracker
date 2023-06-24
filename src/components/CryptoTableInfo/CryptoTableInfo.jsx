import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BiSolidUpArrow, BiSolidDownArrow, BiLoaderAlt } from "react-icons/bi";
import CryptoTable from "../CryptoTable/CryptoTable";
import Pagination from "../Pagination/Pagination";
import "./CryptoTableInfoStyles.css";

const CryptoTableInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const cryptoData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const showLoader = () => {
    return (
      <div className="loadingContainer">
        <BiLoaderAlt />
        Loading...
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        // console.log("cryptoData", res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(
          "Axios Error 💥 Rate Limit Exceed! Data did not get fetched"
        );

        setLoading(true);
      });
  }, [currentPage]);

  if (loading) {
    return showLoader();
  }

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
      Cell: ({ value }) => {
        return (
          <p className="priceCell">
            $ {parseFloat(value.toFixed(2)).toLocaleString()}
          </p>
        );
      },
    },
    {
      Header: "Price Change (24h)",
      accessor: "price_change_percentage_24h",
      Cell: ({ value }) => {
        return (
          <p className={value >= 0 ? "risePercentage" : "dropPercentage"}>
            {value >= 0 ? (
              <BiSolidUpArrow className="upArrowIcon" />
            ) : (
              <BiSolidDownArrow className="downArrowIcon" />
            )}
            {value}
          </p>
        );
      },
    },
    {
      Header: "Market Cap Change (24h)",
      accessor: "market_cap_change_percentage_24h",
      Cell: ({ value }) => {
        return (
          <p className={value >= 0 ? "risePercentage" : "dropPercentage"}>
            {value >= 0 ? (
              <BiSolidUpArrow className="upArrowIcon" />
            ) : (
              <BiSolidDownArrow className="downArrowIcon" />
            )}
            {" " + value}
          </p>
        );
      },
    },
    {
      Header: "Market Cap",
      accessor: "market_cap",
      Cell: ({ value }) => {
        return <p>$ {value}</p>;
      },
    },
    {
      Header: "Circulating Supply",
      accessor: "circulating_supply",
      Cell: ({ value }) => {
        return <p>{value}</p>;
      },
    },
  ];

  const lastPage = 10;

  return (
    <div className="tableContainer">
      <div className="cryptoTableContainer">
        <CryptoTable columns={columns} data={cryptoData} />
      </div>
      <div
        className={`paginationContainer ${
          currentPage > 3 && currentPage < lastPage - 3 ? "middlePage" : ""
        }`}>
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CryptoTableInfo;
