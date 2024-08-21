import logo from './logo.svg';
import './App.css';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'

import Admin from './pages/admin'
import Author from './pages/author'
import Publisher from './pages/publisher'
import Customer from './pages/customer'
import LoginUser from './pages/login';
import Denied from './pages/denied';
import RegisterCustomer2 from './pages/customerRegister2';
import BookUpload from './pages/BookUpload';
import BookCatalog from './pages/Bookcatalog';
import Bookdisplay from './pages/Bookdisplay';
import RegisterAuthor2 from './pages/authorRegister2';
import PendingApproval from './pages/pendingApproval';
import HomePage from './pages/homePage';
import Register1 from './pages/register1';
import ChartAuthor from './pages/dashboard/chartAdmin';
import Reviews from './pages/bookwithReview';
import BookView from './pages/bookwithReview';
import CartPage from './pages/cart';
import OrderConfirm from './pages/orderConfirmPage';
import Library from './pages/library';
import BookRead from './pages/BookRead';
import Home from './components/Home';
import SearchPage from './pages/searchPage';
import OrderConfirmPage from './pages/orderVerifyPage';
import ReceiptPage from './pages/recieptPage';
import OrderHistory from './pages/orderHistory';
import KeywordSearchPage from './pages/keyWordSearchPage';
import CategorySearch from './pages/categorySearchPage';
import AboutTheAuthor from './pages/aboutTheAuthor';
import PaymentPage from './pages/paymentPage';

function App() {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<LoginUser />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/author' element={<Author />} />
      <Route path='/publisher' element={<Publisher />} />
      <Route path='/customer' element={<Customer />} />
      <Route path='/acessDenied' element={<Denied/>} />
      <Route path='/customer/register/details' element={<RegisterCustomer2/>} />
      <Route path='/book/add' element={<BookUpload/>} />
      <Route path='/book/catalog' element={<BookCatalog/>} />
      <Route path='/author/register/details' element = {<RegisterAuthor2/>}/>
      <Route path='/author/pending' element = {<PendingApproval/>}/>
      <Route path='/customer/register' element={<Register1/>} />
      <Route path='/author/register' element={<Register1/>} />
      <Route path='/book/buy' element={<Reviews/>} />
      <Route path='/book/display/:idHash' element={<BookView/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/order' element={<OrderConfirmPage/>} />
      <Route path='/library' element={<Library/>} />
      <Route path='/book/view'element={<BookRead/>} />
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/order/reciept' element={<ReceiptPage/>} />
      <Route path='/order/history' element={<OrderHistory/>} />
      <Route path='/keyword/:id' element={<KeywordSearchPage/>}/>
      <Route path='/category/:id' element={<CategorySearch/>}/>
      <Route path='/author/about/:id' element={<AboutTheAuthor/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
    </Routes>

    <ToastContainer />
  </div>
  );
}

export default App;
