import { useState } from 'react';
import AddOrUpdateTask from '../Dashboard/AddOrUpdateTask';
import AddOrUpdateGroups from '../Sidebar/AddOrUpdateGroups';
import { EllipsisVertical, CircleCheckBig, Star, Check, Trash2 } from "lucide-react";
import { SaveTask } from '@/api/TaskApi';
import { FormateDate } from "../../global/Helper";
import { useTaskEvents } from '../../Hooks/TaskEvents';

const Starred = () => {
    const {
        showAddorEditTaskModel, setShowAddorEditTaskModel,
        showAddorEditGroupModel, setShowAddorEditGroupModel,
        taskIdForEdit, setTaskIdForEdit,
        gorupIdForAddTask, setGorupIdForAddTask,
        taskIdToMoveNewGroup,
        hendleEditTask,
        handleAddTask,
        handleDeleteTask,
        hendleUpdateStar,
        handleCompleteTask,
        handleMoveTaskToNewList,
        handleSort,
        handleShowModelToMoveTaskToNewList,
        updateTaskLists,
        allStarredTasks,
        taskGroups,
        handleMoveTask
    } = useTaskEvents();

    const [openGroupMenu, setOpenGroupMenu] = useState(null);
    const [openTaskIdMenu, setOpenTaskIdMenu] = useState(null);

    const hendleAddOrEdit = async (item) => {
        let itemToAddOrEdit = {};

        if (item.taskId == 0) {
            itemToAddOrEdit = { ...item, isStarred: true };
        } else {
            itemToAddOrEdit = item;
        }

        const res = await SaveTask(itemToAddOrEdit);
        if (!res.isSuccess) {
            console.error("error while add or update task", res);
        }

        await updateTaskLists()
        setTaskIdForEdit(0);
        setGorupIdForAddTask(0);
    }

    return (
        <div className="content">
            <div className="task-scroll-container">
                {
                    <div className="task-scroll m-auto">
                        {
                            allStarredTasks &&

                            <div key={allStarredTasks.groupId} className="task-card">

                                <div className="task-card-header">
                                    <h4>{allStarredTasks.groupName}</h4>
                                    <div className="task-group-menu" onClick={() => setOpenGroupMenu(!openGroupMenu)} tabIndex={0} role="button" aria-label="Open menu">
                                        <EllipsisVertical />
                                        {openGroupMenu && (
                                            <div className="submenu">
                                                <div className="submenu-section">
                                                    <div className="submenu-title">Sort by</div>
                                                    <div className="submenu-item sort-item" onClick={() => handleSort("My order", allStarredTasks.groupId)} style={{ fontWeight: allStarredTasks.sortBy === "My order" ? "bold" : "normal" }}>My order</div>
                                                    <div className="submenu-item sort-item" onClick={() => handleSort("Date", allStarredTasks.groupId)} style={{ fontWeight: allStarredTasks.sortBy === "Date" ? "bold" : "normal" }}>Date</div>
                                                    <div className="submenu-item sort-item" onClick={() => handleSort("Title", allStarredTasks.groupId)} style={{ fontWeight: allStarredTasks.sortBy === "Title" ? "bold" : "normal" }}>Title</div>
                                                    <div className="submenu-item sort-item" onClick={() => handleSort("Description", allStarredTasks.groupId)} style={{ fontWeight: allStarredTasks.sortBy === "Description" ? "bold" : "normal" }}>Description</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button className="btn add-task-button" onClick={() => handleAddTask(allStarredTasks.groupId)}><CircleCheckBig className="add-task-check" />Add starred a task</button>
                                <div className="task-card-body">
                                    {
                                        allStarredTasks.taskList &&
                                            allStarredTasks.taskList.length > 0
                                            ?
                                            <div className="incomplete-task">
                                                {
                                                    allStarredTasks.taskList.map(task => (

                                                        <div key={task.taskId} className="row">
                                                            <div className="col-1 mt-0 d-flex justify-content-center"><input type="radio" onClick={() => handleCompleteTask(task.taskId)} /></div>
                                                            <div className="col-7 task-details mt-2"
                                                                onClick={() => hendleEditTask(task.taskId)}>
                                                                <div className="task-title">
                                                                    {task.title}
                                                                </div>

                                                                {task.description?.trim() &&

                                                                    <div className="task-description">
                                                                        {task.description}
                                                                    </div>
                                                                }
                                                                {task.toDoDate?.trim() &&

                                                                    <div className="task-date">
                                                                        {FormateDate(task.toDoDate)}
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="col-2 task-menuwrapper d-flex justify-content-center">
                                                                <div className="task-menu" onClick={() => setOpenTaskIdMenu(openTaskIdMenu == task.taskId ? null : task.taskId)}>

                                                                    <EllipsisVertical />
                                                                    {openTaskIdMenu == task.taskId && (
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
                                                                                        allStarredTasks.groupId === groupItem.listId ?
                                                                                            <div key={groupItem.listId} className="tasksubmenu-item" onClick={() => handleMoveTask(task.taskId, groupItem.listId)}>
                                                                                                <div className="row">
                                                                                                    <div className="col-2"><Check /></div>
                                                                                                    <div className="col-10">{groupItem.listName}</div>
                                                                                                </div>
                                                                                            </div> :
                                                                                            <div key={groupItem.listId} className="tasksubmenu-item" onClick={() => handleMoveTask(task.taskId, groupItem.listId)}>

                                                                                                <div className="row">
                                                                                                    <div className="col-2"></div>
                                                                                                    <div className="col-10">{groupItem.listName}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                    ))
                                                                                }
                                                                                <div className="tasksubmenu-item" onClick={() => handleShowModelToMoveTaskToNewList(task.taskId)}><div className="row">
                                                                                    <div className="col-2"></div>
                                                                                    <div className="col-10">+ new list</div>
                                                                                </div></div>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                </div>
                                                            </div>

                                                            <div className={`col-2 d-flex star-div justify-content-center mt-2 always-visible text-primary`} onClick={() => hendleUpdateStar(task.taskId)}><Star /></div>

                                                        </div>
                                                    ))
                                                }

                                            </div>
                                            :
                                            <h3 className="text-center">No task yet</h3>
                                    }


                                </div>
                            </div>

                        }
                    </div>
                }


            </div >

            {showAddorEditTaskModel == true &&
                <AddOrUpdateTask
                    show={showAddorEditTaskModel}
                    setShow={setShowAddorEditTaskModel}
                    onAddOrEdit={hendleAddOrEdit}
                    editTaskId={taskIdForEdit}
                    setEditTaskId={setTaskIdForEdit}
                    taskGroupId={gorupIdForAddTask}
                />
            }

            {showAddorEditGroupModel
                && <AddOrUpdateGroups
                show={showAddorEditGroupModel}
                setShow={setShowAddorEditGroupModel}
                handleAddorEdit={handleMoveTaskToNewList}
                editGroupId={0}
                taskIdToMove={taskIdToMoveNewGroup}
                onMove={handleMoveTaskToNewList}
                />}
        </div>
    )
}

export default Starred;