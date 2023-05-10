/// <reference types="react-scripts" />

interface State {
  user: {
    currentUser: User | null;
    isFetching: boolean;
    error: boolean;
    users: User[];
    user: User | null;
  };
  product: {
    products: Product[],
    isFetching: boolean,
    error: boolean,
  }
}

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  image: string;
  status: string;
  fullName: string;
  country: string;
  number: string;
  createdAt: string;
  accessToken: string;
}

interface Order {
  _id: string;
  userId: string;
  products: OrderProduct[],
  amount: number;
  address: { type: Object, required: true };
  status: string;
  createdAt: string;
}

interface UserStat {
  index: number;
  _id: number;
  total: number;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  size: string[];
  color: string[];
  price: number;
  inStock: boolean;
}

interface ProductStats {
  name: string;
  Sales: number;
}