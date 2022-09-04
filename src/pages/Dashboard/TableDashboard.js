import React, { useEffect, useState } from "react";
import { CategoryAPI } from "../../apis/CategoryAPI";
import moment from "moment";

import { Badge, TableRow, TableCell } from "@windmill/react-ui";
import { useSelector } from "react-redux";

const TableDashboard = ({ status, transaction }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [category, setCategory] = useState();

  useEffect(() => {
    const getCategory = async () => {
      const res = await CategoryAPI.get(
        user.token,
        transaction.product.category_id
      );
      setCategory(res);
    };

    getCategory();
  }, []);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold">{transaction.product.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {category?.name}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">Rp {transaction.price}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm"> {transaction.quantity}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">Rp {transaction.amount}</span>
      </TableCell>
      <TableCell>
        <Badge
          type={status}
          className={
            status == "income"
              ? "text-teal-700 bg-teal-100 dark:text-white dark:bg-teal-600"
              : "text-purple-700 bg-purple-100 dark:text-white dark:bg-purple-600"
          }
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {moment(transaction.created_at).format("DD MMMM YYYY")}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default TableDashboard;
