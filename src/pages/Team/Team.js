import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { TeamAPI } from "../../apis/TeamAPI";
import { useSelector } from "react-redux";

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
import { FaUserCircle } from "react-icons/fa";

const Team = () => {
  const { currentUser } = useSelector((state) => state.user);
  const history = useHistory();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      const res = await TeamAPI.getAll(currentUser.token);
      const filteredUser = res.filter((data) => data.id != currentUser.user.id);
      setTeams(filteredUser);
    };
    getTeams();
  }, []);

  const handleDelete = async (id) => {
    await TeamAPI.delete(currentUser.token, id);
    history.go(0);
  };

  return (
    <>
      <PageTitle>Team</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <Button className="col-span-1" tag={Link} to="/app/user/add">
          Add User
        </Button>
        <TableContainer className="col-span-3">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>User</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {teams &&
                teams.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <FaUserCircle className="text-2xl mr-3" />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.title}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button
                          tag={Link}
                          to={"/app/user/edit/" + user.id}
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                        >
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button
                          tag={Link}
                          layout="link"
                          size="icon"
                          aria-label="Delete"
                          onClick={() => handleDelete(user.id)}
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

export default Team;
