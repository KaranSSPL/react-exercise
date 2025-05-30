import { useState } from 'react';
import { UpdateGroup, DeleteGroup, DeleteCompletedTask } from '../../api/TaskGroupApi';
import { useTaskEvents } from '../../Hooks/TaskEvents';
import AddOrUpdateGroups from '../Sidebar/AddOrUpdateGroups';

const GroupMenuPopup = ({ group, isStarredList, setOpenGroupMenuPopup }) => {
    const orderList = ["My order", "Date", "Title", "Description"];
    const { RefreshTaskLists, setAllGroupTaskList, allGroupTaskList, setTaskGroups, taskGroups } = useTaskEvents();
    const [visibleModel, setVisibleModel] = useState(false);
    const [groupId, setGroupId] = useState(0);

    const handleSort = async (option, groupId) => {
        let response = {};
        response = taskGroups.find(item => item.listId === groupId);
        setOpenGroupMenuPopup(false);
        if (response?.groupId && response?.groupId > 0) {

            response = await UpdateGroup(groupId, { ...response.data, sortBy: option });
            if (!response.isSuccess) {
                console.error("error while calling api for save group", response);
                alert(`Error! ${response.message}`);
                return;
            }
        }
        await RefreshTaskLists();
    };

    const handleRenameGroup = (groupId) => {
        setVisibleModel(true);
        setGroupId(groupId);
    }

    // Delete a goroup 
    const handleDeleteGroup = async (groupId) => {
        const response = await DeleteGroup(groupId);
        setOpenGroupMenuPopup(false);
        if (!response.isSuccess) {
            console.error("error while delete group", response);
            alert(`Error! ${response.message}`);
            return;
        }

        const updatedGroupTaskList = allGroupTaskList.filter(group => group.groupId !== groupId);
        setAllGroupTaskList(updatedGroupTaskList);
        const updatedTaskGroups = taskGroups.filter(group => group.listId !== groupId);
        setTaskGroups(updatedTaskGroups);
    };

    const handleDeleteCompletedTask = async (groupId) => {
        const response = await DeleteCompletedTask(groupId);
        setOpenGroupMenuPopup(false);
        if (!response.isSuccess) {
            console.error("error while delete group", response);
            alert(`Error! ${response.message}`);
            return;
        }

        const updatedGroupTaskList = allGroupTaskList.map(group =>
            group.groupId === groupId ? { ...group, completedTaskList: [] } :
                { ...group }
        );
        setAllGroupTaskList(updatedGroupTaskList);
    }

    return (
        <>

            <div className="submenu">
                <div className="submenu-section">
                    <div className="submenu-title">Sort by</div>
                    {
                        orderList.map(order => (

                            <div key={order} className="submenu-item sort-item" onClick={() => handleSort(order, group.groupId)} style={{ fontWeight: group.sortBy === order ? "bold" : "normal" }}>{order}</div>
                        ))
                    }
                </div>
                {!isStarredList &&
                    <>
                        <div className="submenu-divider"></div>
                        <div className="submenu-item" onClick={() => handleRenameGroup(group.groupId)}>Rename list</div>
                        {
                            group.groupId !== 1 ?
                                <div className="submenu-item" onClick={() => handleDeleteGroup(group.groupId)} > Delete list </div> :
                                <div className="submenu-item text-secondary">Delete list</div>
                        }

                        <div className="submenu-item disabled" onClick={() => handleDeleteCompletedTask(group.groupId)}>Delete all completed tasks</div>
                    </>
                }
            </div>


            {visibleModel &&
                <AddOrUpdateGroups
                    visible={visibleModel}
                    setVisibility={setVisibleModel}
                    groupId={groupId}
                    taskIdToMove={0}
                    setOpenGroupMenuPopup={setOpenGroupMenuPopup}
                />
            }
        </>
    )
}
export default GroupMenuPopup;