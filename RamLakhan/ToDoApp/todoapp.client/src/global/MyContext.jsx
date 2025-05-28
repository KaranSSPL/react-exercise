import React, { createContext, useState } from 'react';

export const Context = createContext();

export const MyContextProvider = ({ children }) => {
    const [taskGroups, setTaskGroups] = useState([]);
    const [allGroupTaskList, setAllGroupTaskList] = useState([]);
    const [allStarredTasks, setallStarredTasks] = useState({});
    const [hideSidebar, setHideSidebar] = useState(false);
    const [sidebarShow, setSidebarShow] = useState(true);
    const [unfoldable, setUnfoldable] = useState(false);
    const [theme, setTheme] = useState('light');

    return (
        <Context.Provider value={{ theme, setTheme, sidebarShow, setSidebarShow, unfoldable, setUnfoldable, taskGroups, setTaskGroups, allGroupTaskList, setAllGroupTaskList, allStarredTasks, setallStarredTasks, hideSidebar, setHideSidebar }}>
            {children}
        </Context.Provider>
    );

}  