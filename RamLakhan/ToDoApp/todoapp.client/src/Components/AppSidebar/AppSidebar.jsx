import React from 'react';
//import { Context } from '../../global/MyContext';
import {
    CCloseButton,
    CSidebar,
    CSidebarBrand,
    CSidebarFooter,
    CSidebarHeader,
    CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
/*import { AppSidebarNav } from './AppSidebarNav';
import navigation from '../../_nav';*/
/*import { logo } from '../../assets/brand/logo'*/
import { sygnet } from '../../assets/brand/sygnet'
import { useSelector, useDispatch } from 'react-redux'

const AppSidebar = () => {
    //const { unfoldable, setUnfoldable, sidebarShow, setSidebarShow } = useContext(Context);
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
     const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <CSidebar
            className="border-end"
            colorScheme="dark"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible })
            }}>
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand to="/">
                    {/*Raml Todo App*/}
                    <p className="sidebar-brand-full">Ramlakhan</p>
                    {/*<CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />*/}
                    <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
                </CSidebarBrand>
                <CCloseButton
                    className="d-lg-none"
                    dark
                    onClick={() => dispatch({ type: 'set', sidebarShow: false })}
                />
            </CSidebarHeader>
           {/* <AppSidebarNav items={navigation} />*/}
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <CSidebarToggler
                    onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
                />
            </CSidebarFooter>
        </CSidebar>
    )
}

export default React.memo(AppSidebar)
