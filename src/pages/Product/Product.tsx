import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Product.scss";
import { Chart } from "../../components/Chart"
import PublishIcon from "@mui/icons-material/Publish";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
import { Loader } from "../../components/Loader";

export const Product: React.FC = React.memo(
  () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [productStats, setProductStats] = useState<ProductStats[]>([]);

    const product: Product = useSelector((state: any) => state.product.products.find((product: Product) => product._id === id));
    const [isFetching, setIsFetching] = useState(true);

    const [updatedProduct, setUpdatedProduct] = useState({ ...product });
    const [categories, setCategories] = useState(updatedProduct?.categories);
    const [size, setSizes] = useState(updatedProduct?.size);
    const [color, setColors] = useState(updatedProduct?.color);
    const [inStock, setInStock] = useState(updatedProduct?.inStock);
    const [file, setFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState(updatedProduct?.image);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");

    const MONTHS = useMemo(
      () => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      []
    );

    useEffect(() => {
      const getStats = async () => {
        try {
          const response = await userRequest.get(`orders/income?pid=${id}`);
          const list = response.data.sort((a: any, b: any) => a._id - b._id)

          list.map((item: any) => (
            setProductStats((prev) => [
              ...prev,
              {
                name: MONTHS[item._id - 1],
                Sales: item.total,
              },
            ])
          ))
          setIsFetching(false);
        } catch (error) {
          console.log(error);
        }
      }

      getStats();
    }, [MONTHS, id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedProduct((prev: any) => (
        {
          ...prev,
          ...(event.target.name === 'price'
            ? ({
              [event.target.name]: Number(event.target.value)
            })
            : ({
              [event.target.name]: event.target.value
            })
          ),
        }
      ));
    };

    const handleUpload = () => {
      if (file) {
        const fileName = new Date().getTime() + file!.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file!);

        uploadTask.on('state_changed',
          (snapshot: any) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            setUploadMessage(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
              setImageURL(downloadURL);
              setUploadMessage("upload successful.");
            });
          }
        );
      }
    }

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setInStock(Boolean(event.target.value));
    }

    const handleCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategories(event.target.value.split(','));
    };

    const handleSizes = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSizes(event.target.value.split(','));
    };

    const handleColors = (event: React.ChangeEvent<HTMLInputElement>) => {
      setColors(event.target.value.split(','));
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      
      const finalProduct = {
        ...updatedProduct,
        image: imageURL,
        categories,
        size,
        color,
        inStock,
      };

      updateProduct(dispatch, product._id, finalProduct);

      navigate('/products');
    }

    return !isFetching
      ? (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>

            <Link to="/newproduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>

          <div className="productTop">
              <div className="productTopLeft">
                  <Chart
                    data={productStats}
                    dataKey="Sales"
                    title="Sales Performance"
                  />
              </div>

              <div className="productTopRight">
                  <div className="productInfoTop">
                      <img
                        src={product.image}
                        alt=""
                        className="productInfoImg"
                      />

                      <span className="productName">{product.title}</span>
                  </div>

                  <div className="productInfoBottom">
                      <div className="productInfoItem">
                          <span className="productInfoKey">id:</span>

                          <span className="productInfoValue">{product._id}</span>
                      </div>

                      <div className="productInfoItem">
                          <span className="productInfoKey">sales:</span>

                          <span className="productInfoValue">5123</span>
                      </div>

                      <div className="productInfoItem">
                          <span className="productInfoKey">in stock:</span>

                          <span className="productInfoValue">
                            {product.inStock ? 'yes' : 'no'}
                          </span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="productBottom">
              <form className="productForm">
                  <div className="productFormLeft">
                      <label>Product Name</label>

                      <input
                        name="title"
                        type="text"
                        value={updatedProduct!.title}
                        onChange={handleChange}
                      />
                      
                      <label>Product Description</label>

                      <input
                        name="description"
                        type="text"
                        value={updatedProduct!.description}
                        onChange={handleChange}
                      />
                      
                      <label>Product Price</label>

                      <input
                        name="price"
                        type="number"
                        value={updatedProduct!.price}
                        onChange={handleChange}
                      />

                      <label>Categories</label>

                      <input
                        name="categories"
                        type="text"
                        value={categories}
                        onChange={handleCategories}
                      />

                      <label>Sizes</label>

                      <input
                        name="size"
                        type="text"
                        value={size}
                        onChange={handleSizes}
                      />

                      <label>Colors</label>

                      <input
                        name="color"
                        type="text"
                        value={color}
                        onChange={handleColors}
                      />

                      <label>In Stock</label>

                      <select
                        name="inStock"
                        id="idStock"
                        onChange={handleSelect}
                      >
                          <option value="true">Yes</option>

                          <option value="false">No</option>
                      </select>
                  </div>
                  
                  <div className="productFormRight">
                      <div className="productUpload">
                        {fileName && fileName}

                        <img
                          src={product.image}
                          alt=""
                          className="productUploadImg"
                        />

                        <div className="productUploadContainer">
                          <label htmlFor="file">
                              <PublishIcon/>
                          </label>

                          <input
                            type="file"
                            id="file"
                            style={ { display:"none" } }
                            onChange={(event) => {
                              setFile(event.target.files![0]);
                              setFileName(event.target.files![0].name);
                            }}
                          />

                          <button onClick={handleUpload}>Upload</button>
                        </div>

                        {uploadMessage && uploadMessage}
                      </div>

                      <button
                        className="productButton"
                        onClick={handleClick}
                      >
                        Update
                      </button>
                  </div>
              </form>
          </div>
        </div>
      )
      : (
        <Loader />
      )
  }
)