import React, { useState } from "react";
import { useTable } from "react-table";
import "./CryptoTable.css";
import Pagination from "../Pagination/Pagination";

const CryptoTable = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // console.log("data", data);

  return (
    <>
      <table {...getTableProps()} className="table">
        <thead className="tableHeader">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers?.map((column) => (
                <th {...column.getHeaderProps()} className="tableHead">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="tableBody">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="tableRow">
                {row.cells?.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="tableData">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default CryptoTable;
