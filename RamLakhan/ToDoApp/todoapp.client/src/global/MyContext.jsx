import React, { createContext, useState } from 'react';

export const Context = createContext();

export const MyContextProvider = ({ children }) => {
    const [taskGroups, setTaskGroups] = useState([]);
    const [allGroupTaskList, setAllGroupTaskList] = useState([]);
    const [allStarredTasks, setallStarredTasks] = useState({});
    const [hideSidebar, setHideSidebar] = useState(false);

    return (
        <Context.Provider value={{ taskGroups, setTaskGroups, allGroupTaskList, setAllGroupTaskList, allStarredTasks, setallStarredTasks, hideSidebar, setHideSidebar }}>
            {children}
        </Context.Provider>
    );

}  