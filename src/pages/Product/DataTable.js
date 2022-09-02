import React, { useEffect, useState } from "react";
import { CategoryAPI } from "../../apis/CategoryAPI";
import moment from "moment";
import { TableRow, TableCell, Button, Link } from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../../icons";

const DataTable = ({ product, categoryId }) => {
  const [category, setCategory] = useState();

  useEffect(() => {
    const getCategory = async () => {
      const category = await CategoryAPI.get(categoryId);
      setCategory(category);
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
              {category}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">$ {product.amount}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">{product.stock}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {moment(product.created_at).format("D MMMM YYYY")}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-4">
          <Button
            tag={Link}
            to={"/app/product/edit/" + product.id}
            layout="link"
            size="icon"
            aria-label="Edit"
          >
            <EditIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button
            tag={Link}
            to={"/app/product/delete/" + product.id}
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
