import { useContext } from 'react';
import { Context } from '../global/MyContext';
import {  GetGroupsTaskList, GetStarredTask,} from '../api/TaskGroupApi';

export function useTaskEvents() {

    const {
        allGroupTaskList,
        setAllGroupTaskList,
        allStarredTasks,
        setallStarredTasks,
        taskGroups,
        setTaskGroups,
        hideSidebar, setHideSidebar
    } = useContext(Context);

    // Refresh groups task list and starred task list
    const RefreshTaskLists = async () => {
        const res = await GetGroupsTaskList();
        if (res.isSuccess) {
            setAllGroupTaskList(res.data);
        } else {
            console.error("Failed or unexpected response:", res.message, res.data);
        }
        const starredTask = await GetStarredTask();
        if (starredTask.isSuccess) {
            setallStarredTasks(starredTask.data);
        } else {
            console.error("Failed or unexpected response:", starredTask.message, starredTask.data);
        }
    };

    return {
        //states
        hideSidebar, setHideSidebar,
        //handlers
        RefreshTaskLists,
        //context values
        allGroupTaskList,
        setAllGroupTaskList,
        allStarredTasks,
        setallStarredTasks,
        taskGroups,
        setTaskGroups
    };
}