import { useEffect, useState } from "react";
import { IUser } from "../../type";
import { deleteUser, getUsers, setUserRole } from "../../api";
import { ServerErrorCollapse } from "../ServerErrorCollapse/ServerErrorCollapse";
import {
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const CRMContent = () => {
    const [allUsers, setAllUsers] = useState<IUser[] | null>(null);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        getUsers()
            .then((response) => {
                if (!response) return;
                setAllUsers(response.data);
            })
            .catch((e) => {
                setServerError(e.message);
            });
    }, []);

    if (!allUsers) return null;
    const onClickDelete = (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        deleteUser(id)
            .then((response) => {
                if (!response || response.error !== 0) {
                    setServerError("Server error");
                    return;
                }

                if (response.error === 0) {
                    setAllUsers(allUsers.filter((user) => user._id !== id));
                }
            })
            .catch((e) => {
                setServerError(e.message);
            });
    };
    const onClickSetRole = (id: string, role: "user" | "admin") => {
        setUserRole(id, role).then((response) => {
            if (!response || response.error !== 0) {
                setServerError("Server error");
                return;
            }
            if (response.error === 0) {
                setAllUsers(
                    allUsers.map((user) => {
                        if (user._id === id) {
                            user.role = role;
                        }
                        return user;
                    })
                );
            }
        });
    };

    return (
        <>
            <ServerErrorCollapse
                serverError={serverError}
                setServerError={setServerError}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Admin</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers.map((user, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell align="right">{user.lastName}</TableCell>
                                    <TableCell align="right">{user.phone}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">
                                        <Switch
                                            checked={user.role === "admin"}
                                            onChange={(ev) => {
                                                onClickSetRole(
                                                    user._id,
                                                    ev.target.checked ? "admin" : "user"
                                                );
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Date(user.createdAt).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                onClickDelete(user._id);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};