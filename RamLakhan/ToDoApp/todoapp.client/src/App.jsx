import {  Suspense, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyContextProvider } from './global/MyContext';
import './scss/style.scss'
import { useSelector } from 'react-redux'
//import { Context } from './global/MyContext';
import { CSpinner, useColorModes } from '@coreui/react'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
import DefaultLayout from './Layout/DefaultLayout';

function App() {
    const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
    //const { theme } = useContext(Context);
    const storedTheme = useSelector((state) => state.theme);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.href.split('?')[1])
        const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
        if (theme) {
            setColorMode(theme)
        }

        if (isColorModeSet()) {
            return
        }

        setColorMode(storedTheme)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (

        <BrowserRouter>
            <Suspense
                fallback={
                    <div className="pt-3 text-center">
                        <CSpinner color="primary" variant="grow" />
                    </div>
                }>
                <MyContextProvider>
                    <Routes>
                        <Route path="*" element={<DefaultLayout />} />

                    </Routes>
                </MyContextProvider>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;