import React, { useEffect, useState } from "react";
import { CategoryAPI } from "../../apis/CategoryAPI";
import moment from "moment";
import { TableRow, TableCell, Button, Link } from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../../icons";
import { useSelector } from "react-redux";

const DataTable = ({ product }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      const res = await CategoryAPI.get(user.token, product.category_id);
      setCategory(res);
    };
    getCategory();
  }, []);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {category.name}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">Rp {product.price}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">{product.stock}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {moment(product.updated_at).format("D MMMM YYYY")}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default DataTable;
