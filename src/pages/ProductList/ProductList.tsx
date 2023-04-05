import "./ProductList.scss";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { Loader } from "../../components/Loader";

export const ProductList: React.FC = React.memo(
  () => {
    const dispatch = useDispatch();
    const isFetching = useSelector((state: any) => state.product.isFetching);
    const products = useSelector((state: any) => state.product.products);
    const [paginationModel, setPaginationModel] = useState({
      pageSize: 8,
      page: 0,
    });

    useEffect(() => {
      getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id: number) => {
      deleteProduct(dispatch, id);
    };

    const columns = [
      { field: "_id", headerName: "ID", width: 220 },
      {
        field: "product",
        headerName: "Product",
        width: 200,
        renderCell: (params: any) => {
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.image} alt="" />
              {params.row.title}
            </div>
          );
        },
      },
      { field: "inStock", headerName: "Stock", width: 200 },
      {
        field: "price",
        headerName: "Price",
        width: 160,
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params: any) => {
          return (
            <>
              <Link to={"/product/" + params.row._id}>
                <button className="productListEdit">Edit</button>
              </Link>

              <DeleteOutlineIcon
                className="productListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];

    return !isFetching
      ? (
        <div className="productList">
          <DataGrid
            rows={products}
            disableRowSelectionOnClick
            columns={columns}
            getRowId={(row: any) => row ? (row._id) : 0}
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