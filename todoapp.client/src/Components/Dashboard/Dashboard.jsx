import { useState } from 'react';
import AddOrUpdateTask from './AddOrUpdateTask';
import { EllipsisVertical, CircleCheckBig, Star, Check, Trash2, ArrowBigRightDash, ArrowBigDown } from "lucide-react";
import { DeleteCompletedTask } from '@/api/TaskApi';
import { FormateDate } from "../../global/Helper";
import AddOrUpdateGroups from '../Sidebar/AddOrUpdateGroups';
import { useTaskEvents } from '@/Hooks/TaskEvents';

const Dashboard = () => {
    const {
        showAddorEditTaskModel, setShowAddorEditTaskModel,
        taskIdForEdit, setTaskIdForEdit,
        showAddorEditGroupModel, setShowAddorEditGroupModel,
        taskIdToMoveNewGroup,
        hideSidebar,
        gorupIdForAddTask,
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
        allGroupTaskList,
        setAllGroupTaskList,
        handleSort,
        handleMoveTask,
        taskGroups
    } = useTaskEvents();

    const [renameGroupid, setRenameGroupid] = useState(0);
    const [openGroupRenameModel, setOpenGroupRenameModel] = useState(false);
    const [openGroupMenuId, setOpenGroupMenuId] = useState(null);
    const [openTaskMenuId, setOpenTaskMenuId] = useState(null);
    const [openCompletedGroupId, setOpenCompletedGroupId] = useState(null);

    const showModelForRenameGroup = (groupId) => {
        setOpenGroupRenameModel(true);
        setRenameGroupid(groupId);
    }

    const handleDeleteCompletedTask = async (groupId) => {
        const res = await DeleteCompletedTask(groupId);
        if (res.isSuccess) {
            const updatedGroupTaskList = allGroupTaskList.map(group =>
                group.groupId === groupId ? { ...group, completedTaskList: [] } :
                    { ...group }
            );
            setAllGroupTaskList(updatedGroupTaskList);
        } else {
            console.error("error while delete group", res);
        }
    }

    return (
        
        <div className={`content ${hideSidebar ? "sidebar-hidden" : ""}`}>
            <div className="task-scroll-container">
                {
                    <div className="task-scroll">
                        {
                            allGroupTaskList && allGroupTaskList.length > 0 &&

                            allGroupTaskList.map(group => (

                                group.isEnableShow &&

                                <div key={group.groupId} className="task-card">

                                    <div className="task-card-header">
                                        <h4>{group.groupName}</h4>
                                        <div className="task-group-menu" onClick={() => setOpenGroupMenuId(openGroupMenuId === group.groupId ? null : group.groupId)} tabIndex={0} role="button" aria-label="Open menu">
                                            <EllipsisVertical />
                                            {openGroupMenuId === group.groupId && (
                                                <div className="submenu">
                                                    <div className="submenu-section">
                                                        <div className="submenu-title">Sort by</div>
                                                        <div className="submenu-item sort-item" onClick={() => handleSort("My order", group.groupId)} style={{ fontWeight: group.sortBy === "My order" ? "bold" : "normal" }}>My order</div>
                                                        <div className="submenu-item sort-item" onClick={() => handleSort("Date", group.groupId)} style={{ fontWeight: group.sortBy === "Date" ? "bold" : "normal" }}>Date</div>
                                                        <div className="submenu-item sort-item" onClick={() => handleSort("Title", group.groupId)} style={{ fontWeight: group.sortBy === "Title" ? "bold" : "normal" }}>Title</div>
                                                        <div className="submenu-item sort-item" onClick={() => handleSort("Description", group.groupId)} style={{ fontWeight: group.sortBy === "Description" ? "bold" : "normal" }}>Description</div>
                                                        </div>
                                                        <div className="submenu-divider"></div>
                                                    <div className="submenu-item" onClick={() => showModelForRenameGroup(group.groupId)}>Rename list</div>
                                                    {
                                                        group.groupId !== 1 ?
                                                            <div className="submenu-item" onClick={() => handleDeleteGroup(group.groupId)} > Delete list </div> :
                                                            <div className="submenu-item text-secondary">Delete list</div>
                                                    }

                                                    <div className="submenu-item disabled" onClick={() => handleDeleteCompletedTask(group.groupId)}>Delete all completed tasks</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button className="btn add-task-button" onClick={() => handleAddTask(group.groupId)}><CircleCheckBig className="add-task-check" />Add a task</button>
                                    <div className="task-card-body">
                                        {
                                            group.taskList &&
                                                group.taskList.length > 0
                                                ?
                                                <div className="incomplete-task">
                                                    {
                                                        group.taskList.map(task => (

                                                            <div key={task.taskId} className="row">
                                                                <div className="col-1 mt-0 d-flex justify-content-center"><input type="radio" onClick={() => handleCompleteTask(task.taskId, true)} /></div>
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
                                                                    <div className="task-menu" onClick={() => setOpenTaskMenuId(openTaskMenuId === task.taskId ? null : task.taskId)}>

                                                                        <EllipsisVertical />
                                                                        {openTaskMenuId === task.taskId && (
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
                                                                                            group.groupId === groupItem.listId
                                                                                                ?
                                                                                                <div key={groupItem.listId} className="tasksubmenu-item" onClick={() => handleMoveTask(task.taskId, groupItem.listId)}>
                                                                                                    <div className="row">
                                                                                                        <div className="col-2"><Check /></div>
                                                                                                        <div className="col-10">{groupItem.listName}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                <div key={groupItem.listId} className="tasksubmenu-item" onClick={() => handleMoveTask(task.taskId, groupItem.listId)}>

                                                                                                    <div className="row">
                                                                                                        <div className="col-2"></div>
                                                                                                        <div className="col-10">{groupItem.listName}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                        ))
                                                                                    }

                                                                                    <div className="tasksubmenu-item" onClick={() => handleShowModelToMoveTaskToNewList(task.taskId)}>
                                                                                        
                                                                                        <div className="row">
                                                                                            <div className="col-2"></div>
                                                                                            <div className="col-10">+ new list</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                    </div>
                                                                </div>

                                                                <div className={`col-2 d-flex star-div justify-content-center mt-2 ${task.isStarred ? 'always-visible text-primary' : ''}`} onClick={() => hendleUpdateStar(task.taskId)}><Star /></div>

                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                                : group.completedTaskList &&
                                                    group.completedTaskList.length > 0
                                                    ?
                                                    <h3 className="text-center">All task is completed</h3>
                                                    :
                                                    <h3 className="text-center">No task yet</h3>
                                        }

                                        {
                                            group.completedTaskList &&
                                            group.completedTaskList.length > 0 &&

                                            <div className="completed-task">
                                                <button className="btn" onClick={() => setOpenCompletedGroupId(openCompletedGroupId === group.groupId ? null : group.groupId)}>
                                                    {
                                                        openCompletedGroupId === group.groupId
                                                            ?
                                                            <ArrowBigDown />
                                                            :
                                                            <ArrowBigRightDash />
                                                    }
                                                    Completed </button>
                                                {
                                                    group.completedTaskList.map(completeTask => (

                                                        openCompletedGroupId === group.groupId &&
                                                        <div key={completeTask.taskId} className="row">
                                                            <div className="col-1 mt-2" onClick={() => handleCompleteTask(completeTask.taskId, false)}> <Check /></div>
                                                            <div className="col-9 task-details mt-2"
                                                                onClick={() => hendleEditTask(completeTask.taskId)}>
                                                                <div className="task-title">
                                                                    <del>
                                                                        {completeTask.title}
                                                                    </del>
                                                                </div>

                                                                {completeTask.description?.trim() &&

                                                                    <div className="task-description">
                                                                        {completeTask.description}
                                                                    </div>
                                                                }
                                                                {completeTask.toDoDate?.trim() &&

                                                                    <div className="task-date">
                                                                        Completed: {FormateDate(completeTask.toDoDate)}
                                                                    </div>
                                                                }
                                                            </div>

                                                            <div className="col-2 delete-complete-icon d-flex justify-content-center" >
                                                                <Trash2 className="delete-complete-task" onClick={() => handleDeleteTask(completeTask.taskId)} />
                                                            </div>

                                                        </div>

                                                    ))
                                                }
                                            </div>

                                        }

                                    </div>
                                </div>


                            ))
                        }
                    </div>
                }
            </div >

            {showAddorEditTaskModel &&
                <AddOrUpdateTask
                    show={showAddorEditTaskModel}
                    setShow={setShowAddorEditTaskModel}
                    onAddOrEdit={hendleAddOrEdit}
                    editTaskId={taskIdForEdit}
                    setEditTaskId={setTaskIdForEdit}
                    taskGroupId={gorupIdForAddTask}
                />
            }

            {openGroupRenameModel &&
                <AddOrUpdateGroups
                    show={openGroupRenameModel}
                    setShow={setOpenGroupRenameModel}
                    handleAddorEdit={handleRenameGroup}
                    editGroupId={renameGroupid}
                    setEditGroupId={setRenameGroupid}
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
                />
            }
        </div>
    )
}

export default Dashboard;