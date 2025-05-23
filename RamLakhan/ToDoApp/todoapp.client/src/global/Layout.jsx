// src/Components/Layout/Layout.jsx
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';

const Layout = ({ children }) => (
    <>
        <Header />
        <div className="main">
            <Sidebar />
            {children}
        </div>
    </>
);

export default Layout;