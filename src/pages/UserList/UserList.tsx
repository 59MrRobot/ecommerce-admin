import "./UserList.scss";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import { Loader } from "../../components/Loader";

export const UserList: React.FC = React.memo(
  () => {
    const users = useSelector((state: any) => state.user.users);
    const isFetching = useSelector((state: any) => state.product.isFetching);
    const [paginationModel, setPaginationModel] = useState({
      pageSize: 8,
      page: 0,
    });
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleDelete = (id: number) => {
      deleteUser(dispatch, id);
      // navigate(0);
    };

    useEffect(() => {
      getUsers(dispatch);
    }, [dispatch]);
    
    const columns = [
      { field: "_id", headerName: "ID", width: 200 },
      {
        field: "user",
        headerName: "User",
        width: 200,
        renderCell: (params: any) => {
          return (
            <div className="userListUser">
              <img className="userListImg" src={params.row.image} alt="" />
              {params.row.username}
            </div>
          );
        },
      },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "status",
        headerName: "Status",
        width: 120,
      },
      {
        field: "transaction",
        headerName: "Transaction Volume",
        width: 160,
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params: any) => {
          return (
            <>
              <Link to={"/user/" + params.row._id}>
                <button className="userListEdit">Edit</button>
              </Link>
              
              <DeleteOutlineIcon
                className="userListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];

    return !isFetching 
      ? (
        <div className="userList">
          <DataGrid
            rows={users}
            disableRowSelectionOnClick
            columns={columns}
            getRowId={(row: any) => row ? row._id : 0}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            checkboxSelection
          />
        </div>
      )
      : (
        <Loader />
      )
  }
)