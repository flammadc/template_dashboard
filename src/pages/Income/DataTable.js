import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { TableRow, TableCell, Button } from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../../icons";
import { CategoryAPI } from "../../apis/CategoryAPI";
import moment from "moment";
import { useSelector } from "react-redux";
import { IncomeAPI } from "../../apis/IncomeAPI";

const DataTable = ({ income }) => {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [category, setCategory] = useState();

  useEffect(() => {
    const getCategory = async () => {
      const res = await CategoryAPI.get(user.token, income.product.category_id);
      setCategory(res);
    };
    getCategory();
  }, []);

  const handleDelete = async (id) => {
    await IncomeAPI.delete(user.token, id);
    history.go(0);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold">{income.product.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {category?.name}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">Rp {income.price}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">{income.quantity}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">Rp {income.amount}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {moment(income.created_at).format("DD MMMM YYYY")}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-4">
          <Button
            tag={Link}
            to={"/app/income/edit/" + income.id}
            layout="link"
            size="icon"
            aria-label="Edit"
          >
            <EditIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => handleDelete(income.id)}
            layout="link"
            size="icon"
            aria-label="Delete"
          >
            <TrashIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DataTable;
