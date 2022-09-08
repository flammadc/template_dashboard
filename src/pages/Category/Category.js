import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { CategoryAPI } from "../../apis/CategoryAPI";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Button,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../../icons";
import { useSelector } from "react-redux";

const Category = () => {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const getCategories = async () => {
      const res = await CategoryAPI.getAll(user.token);
      setCategories(res);
    };
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    await CategoryAPI.delete(user.token, id);
    history.go(0);
  };

  return (
    <>
      <PageTitle>Category</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <Button className="col-span-1" tag={Link} to="/app/category/add">
          Add Category
        </Button>
        <TableContainer className="col-span-3">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {categories &&
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{category.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button
                          tag={Link}
                          to={"/app/category/edit/" + category.id}
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                        >
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(category.id)}
                          layout="link"
                          size="icon"
                          aria-label="Delete"
                        >
                          <TrashIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Category;
