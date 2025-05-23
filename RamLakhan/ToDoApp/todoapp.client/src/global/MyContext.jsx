import React, { createContext, useState, useEffect } from 'react';
import { GetAllGroupList } from '../api/TaskGroupApi';
import { GetAllGroupsTaskList, GetStarredTask } from '@/api/TaskApi';

export const Context = createContext();

export const MyContextProvider = ({ children }) => {
    const [taskGroups, setTaskGroups] = useState([]);
    const [allGroupTaskList, setAllGroupTaskList] = useState([]);
    const [allStarredTasks, setallStarredTasks] = useState({});
    const [hideSidebar, setHideSidebar] = useState(false);

    useEffect(() => {
        (async () => {
            await getAllGroups();
            await getAllGroupsTask();
            await getStarredTask();
        })();
    }, []);

    const getStarredTask = async () => {
        const res = await GetStarredTask();
        if (res.isSuccess) {
            setallStarredTasks(res.data);
        }
    };

    const getAllGroups = async () => {
        const res = await GetAllGroupList();
        if (res.isSuccess) {
            setTaskGroups(res.data);
        }
    };

    const getAllGroupsTask = async () => {
        const res = await GetAllGroupsTaskList();
        if (res.isSuccess) {
            setAllGroupTaskList(res.data);
        } else {
            console.error("Failed or unexpected response:", res.message, res.data);
        }
    };

    return (
        <Context.Provider value={{ taskGroups, setTaskGroups, allGroupTaskList, setAllGroupTaskList, allStarredTasks, setallStarredTasks, hideSidebar, setHideSidebar }}>
            {children}
        </Context.Provider>
    );

}  