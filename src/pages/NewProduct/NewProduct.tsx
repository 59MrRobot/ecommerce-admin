import React, { useState } from "react";
import "./NewProduct.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const NewProduct: React.FC = React.memo(
  () => {
    const [inputs, setInputs] = useState<any | null>(null);
    const [inStock, setInStock] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [size, setSizes] = useState<string[]>([]);
    const [color, setColors] = useState<string[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev: any) => (
        {
          ...prev,
          [event.target.name]: event.target.value,
        }
      ));
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setInStock(Boolean(event.target.value));
    }

    const handleCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategories(event.target.value.split(','));
    };

    const handleSizes= (event: React.ChangeEvent<HTMLInputElement>) => {
      setSizes(event.target.value.split(','));
    };

    const handleColors = (event: React.ChangeEvent<HTMLInputElement>) => {
      setColors(event.target.value.split(','));
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      const fileName = new Date().getTime() + file!.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file!);

      uploadTask.on('state_changed',
      (snapshot) => {
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            image: downloadURL,
            categories,
            size,
            color,
            inStock,
          };

          addProduct(dispatch, product);

          navigate('/products');
        });
      }
      );
    }

    return (
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>

            <input
              type="file"
              id="file"
              onChange={(event) => setFile(event.target.files![0])}
            />
          </div>

          <div className="addProductItem">
            <label>Title</label>

            <input
              name="title"
              type="text"
              placeholder="Apple Airpods"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Desription</label>

            <input
              name="description"
              type="text"
              placeholder="Desription"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Price</label>

            <input
              name="price"
              type="number"
              placeholder="100"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Categories</label>

            <input
              name="categories"
              type="text"
              placeholder="jeans,skirts"
              onChange={handleCategories}
            />
          </div>

          <div className="addProductItem">
            <label>Sizes</label>

            <input
              name="categories"
              type="text"
              placeholder="XS,S"
              onChange={handleSizes}
            />
          </div>

          <div className="addProductItem">
            <label>Colors</label>

            <input
              name="categories"
              type="text"
              placeholder="black,green"
              onChange={handleColors}
            />
          </div>

          <div className="addProductItem">
            <label>Stock</label>

            <select
              name="inStock"
              id="stock"
              onChange={handleSelect}
            >
              <option value="true">Yes</option>

              <option value="false">No</option>
            </select>
          </div>

          <button className="addProductButton" onClick={handleClick}>Create</button>
        </form>
      </div>
    );
  }
)