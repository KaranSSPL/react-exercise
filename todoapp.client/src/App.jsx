import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import Dashboard from './Components/Dashboard/Dashboard'
import Starred from './Components/StarTask/Starred';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyContextProvider } from './global/MyContext';
import Layout from './global/Layout';

function App() {

    return (

        <BrowserRouter>
            <MyContextProvider>
                <Routes>
                    {/*<Route path="/" element={ <Layout></Layout> } />*/}

                    <Route path="/" element={ <Layout> <Dashboard /> </Layout>} />

                    <Route path="/starred" element={ <Layout> <Starred /> </Layout>} />
                </Routes>
            </MyContextProvider>
        </BrowserRouter>
    );

}

export default App;