import { useState } from "react";
import { useTaskEvents } from "../../Hooks/TaskEvents";
import { DeleteTask, GetTaskById, UpdateTask } from '../../api/TaskApi';
import { Trash2, Check } from 'lucide-react';
import AddOrUpdateGroups from '../Sidebar/AddOrUpdateGroups';

const TaskMenus = ({ task,setOpenTaskMenuPopup }) => {
    const { taskGroups, RefreshTaskLists } = useTaskEvents();
    const [taskIdForMove, setTaskIdForMove] = useState(0);
    const [visibleModelPopup, setVisibleModelPopup] = useState(false);

    // Delete task handler 
    const handleDeleteTask = async (taskId) => {
        const response = await DeleteTask(taskId);
        setOpenTaskMenuPopup(false);
        if (!response.isSuccess) {
            console.error("error while delete task", response);
            alert(`Error! ${response.message}`);
            return;
        }

        await RefreshTaskLists();
    };

    // handle move task to anothe created group
    const handleMoveTask = async (taskId, groupId) => {
        const task = await GetTaskById(taskId);
        setOpenTaskMenuPopup(false);
        if (!task.isSuccess) {
            console.log("error while getting task for move to another group ", task);
            alert(`Error! ${task.message}`);
            return;
        }

        const response = await UpdateTask(taskId, { ...task.data, taskGroupId: groupId });
        if (!response.isSuccess) {
            console.log("error while moving task to another group ", response);
            alert(`Error! ${response.message}`);
            return;
        }

        await RefreshTaskLists();
    }

    return (
        <>
            <div className="tasksubmenu">
                <div className="tasksubmenu-section">
                    <div className="tasksubmenu-item" onClick={() => handleDeleteTask(task.taskId)}>
                        <div className="row">
                            <div className="col-2"><Trash2 /></div>
                            <div className="col-10">Delete</div>
                        </div>
                    </div>
                    <div className="tasksubmenu-devider"></div>
                    <div className="tasksubmenu-title text-bold">My Task</div>

                    {taskGroups &&
                        taskGroups.map(groupItem => (

                            <div key={groupItem.listId} className="tasksubmenu-item" onClick={() => handleMoveTask(task.taskId, groupItem.listId)}>
                                <div className="row">
                                    <div className="col-2">{task.taskGroupId === groupItem.listId ? <Check /> : ""}</div>
                                    <div className="col-10">{groupItem.listName}</div>
                                </div>
                            </div>
                        ))
                    }

                    <div className="tasksubmenu-item" onClick={() => {
                        setTaskIdForMove(task.taskId);
                        setVisibleModelPopup(true);
                    }}>

                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-10">+ new list</div>
                        </div>
                    </div>
                </div>
            </div>

            {visibleModelPopup &&
                <AddOrUpdateGroups
                    visible={visibleModelPopup}
                    setVisibility={setVisibleModelPopup}
                    groupId={0}
                    taskIdToMove={taskIdForMove}
                />
            }

        </>
    )
}
export default TaskMenus;