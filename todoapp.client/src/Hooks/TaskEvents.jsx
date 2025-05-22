import { useContext, useState } from 'react';
import { Context } from '../global/MyContext';
import {
    SaveTask,
    GetAllGroupsTaskList,
    ToggleStarTask,
    GetStarredTask,
    DeleteTask,
    GetTaskById,
    MoveTaskToNewGroup
} from '../api/TaskApi';

import {
    SaveGroup,
    GetAllGroupList,
    DeleteGroup,
    GetGroupById
} from '../api/TaskGroupApi';

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

    const [showAddorEditTaskModel, setShowAddorEditTaskModel] = useState(false);
    const [showAddorEditGroupModel, setShowAddorEditGroupModel] = useState(false);
    const [taskIdToMoveNewGroup, setTaskIdToMoveNewGroup] = useState(0);
    const [taskIdForEdit, setTaskIdForEdit] = useState(0);
    const [gorupIdForAddTask, setGorupIdForAddTask] = useState(0);

    // Set task id for edit and show model
    const hendleEditTask = (taskId) => {
        setTaskIdForEdit(taskId);
        setShowAddorEditTaskModel(true);
    };

    // Set group id for add task and show model
    const handleAddTask = (GroupId) => {
        setGorupIdForAddTask(GroupId);
        setShowAddorEditTaskModel(true);
    };

    // Add or Edit task
    const hendleAddOrEdit = async (item) => {
        const res = await SaveTask(item);
        if (!res.isSuccess) {
            console.error("error while add or update task", res);
        }
        await updateTaskLists();
        setTaskIdForEdit(0);
        setGorupIdForAddTask(0);
    };

    // Delete task handler 
    const handleDeleteTask = async (taskId) => {
        const res = await DeleteTask(taskId);
        if (!res.isSuccess) {
            console.error("error while delete task", res);
        } else {
            await updateTaskLists();
        }
    };

    // mark a task to star or undo
    const hendleUpdateStar = async (taskId) => {
        let res = await ToggleStarTask(taskId);
        if (!res.isSuccess) {
            console.error(`error while calling hendleUpdateStar message '${res.message}'`);
        } else {
            await updateTaskLists();
        }
    };

    // mark complete or uncomplete a task
    const handleCompleteTask = async (taskId, isComplete = true) => {
        const res = await GetTaskById(taskId);
        if (res.isSuccess) {
            const itemToComplete = { ...res.data, isCompleted: isComplete };
            await hendleAddOrEdit(itemToComplete);
        }
    };

    // Rename a task
    const handleRenameGroup = async (item) => {
        const result = await SaveGroup(item);
        if (!result.isSuccess) {
            console.error('Error renaming group :', result);
        }
        const allGroups = await GetAllGroupList();
        if (allGroups.data && allGroups.data.length > 0) {
            setTaskGroups(allGroups.data);
        }
        await updateGroupsTaskList();
    };

    // Delete a goroup 
    const handleDeleteGroup = async (groupId) => {
        const res = await DeleteGroup(groupId);
        if (res.isSuccess) {
            const updatedGroupTaskList = allGroupTaskList.filter(group => group.groupId !== groupId);
            setAllGroupTaskList(updatedGroupTaskList);
            const updatedTaskGroups = taskGroups.filter(group => group.listId !== groupId);
            setTaskGroups(updatedTaskGroups);
        } else {
            console.error("error while delete group", res);
        }
    };

    // short task of a perticular group 
    const handleSort = async (option, groupId) => {
        const group = await GetGroupById(groupId);
        const res = await SaveGroup({ ...group.data, sortBy: option });
        if (!res.isSuccess) {
            console.log("error while calling api for save group", res);
            return;
        }

        await updateTaskLists();

    };

    // handle move task to anothe created group
    const handleMoveTask = async (taskId, groupId) => {
        const task = await GetTaskById(taskId);

        if (!task.isSuccess) {
            console.log("error while getting task for move to another group ", res);
            return;
        }
        const res = await SaveTask({ ...task.data, taskGroupId: groupId });
        if (!res.isSuccess) {
            console.log("error while moving task to another group ", res);
            return;
        }

        await updateTaskLists();
    }

    // set task id to move a new group and show model 
    const handleShowModelToMoveTaskToNewList = (taskId) => {
        setTaskIdToMoveNewGroup(taskId);
        setShowAddorEditGroupModel(true);
    }

    // move task to a new list handler 
    const handleMoveTaskToNewList = async (taskId, groupItem) => {
        if (taskId === 0) {
            console.error("taskId is 0, can't move task");
            return;
        }

        var res = await MoveTaskToNewGroup(taskId, groupItem);
        if (!res.isSuccess) {
            console.error("error while moving task to new group ", res);
            return;
        }

        setTaskIdToMoveNewGroup(0);
        await updateGroups();
        await updateTaskLists();
    }

    // Refresh groups task list 
    const updateGroupsTaskList = async () => {
        const res = await GetAllGroupsTaskList();
        if (res.isSuccess) {
            setAllGroupTaskList(res.data);
        } else {
            console.error("Failed or unexpected response:", res.message, res.data);
        }
    };

    // Refresh group List 
    const updateGroups = async () => {
        const allGroups = await GetAllGroupList();
        if (allGroups.data && allGroups.data.length > 0) {
            setTaskGroups(allGroups.data);
        }
    };

    // Refresh groups task list and starred task list 
    const updateTaskLists = async () => {
        const res = await GetAllGroupsTaskList();
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
        showAddorEditTaskModel, setShowAddorEditTaskModel,
        taskIdForEdit, setTaskIdForEdit,
        gorupIdForAddTask, setGorupIdForAddTask,
        showAddorEditGroupModel, setShowAddorEditGroupModel,
        taskIdToMoveNewGroup, setTaskIdToMoveNewGroup,
        hideSidebar, setHideSidebar,
        //handlers
        hendleEditTask,
        handleAddTask,
        hendleAddOrEdit,
        handleDeleteTask,
        hendleUpdateStar,
        handleCompleteTask,
        handleRenameGroup,
        handleDeleteGroup,
        handleMoveTaskToNewList,
        handleShowModelToMoveTaskToNewList,
        handleSort,
        handleMoveTask,
        updateGroupsTaskList,
        updateGroups,
        updateTaskLists,
        //context values
        allGroupTaskList,
        setAllGroupTaskList,
        allStarredTasks,
        setallStarredTasks,
        taskGroups,
        setTaskGroups
    };
}