import React, { useState, useEffect } from 'react';
import { Star, EllipsisVertical } from 'lucide-react';
import TaskMenus from '../../TaskMenusPopup/TaskMenus';
import { FormateDate } from '../../../global/Helper';
import { ToggleStarTask } from '../../../api/TaskApi';
import { useTaskEvents } from '../../../Hooks/TaskEvents';
import AddOrUpdateTask from '../../AddorUpdateModel/AddOrUpdateTask';


const InCompleteTask = ({ groupId, task, onComplete, openTaskMenuPopup, setOpenTaskMenuPopup }) => {
    const { RefreshTaskLists } = useTaskEvents();
    const [editTaskId, setEditTaskId] = useState(0);
    const [visibleModel, setVisibleModel] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.task-menu') && !event.target.closest('.tasksubmenu') && !event.target.closest('.modal-dialog')) {
                setOpenTaskMenuPopup(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleEditTask = (taskId) => {
        setEditTaskId(taskId);
        setVisibleModel(true);
    }


    // mark a task to star or undo
    const handleToggleStar = async (taskId) => {
        let res = await ToggleStarTask(taskId);
        if (!res.isSuccess) {
            console.error(`error while calling hendleUpdateStar message '${res.message}'`);
        } else {
            await RefreshTaskLists();
        }
    };

    return (

        <>
            <div key={task.taskId} className={`row ${openTaskMenuPopup === task.taskId ? 'force-hover' : ''}`}>
                <div className="col-1 mt-0 d-flex justify-content-center"><input type="radio" onClick={() => onComplete(task, true)} /></div>
                <div className="col-7 task-details mt-2"
                    onClick={() => handleEditTask(task.taskId)}>
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
                    <div className="task-menu" >
                        <EllipsisVertical onClick={() => { setOpenTaskMenuPopup(openTaskMenuPopup === task.taskId ? null : task.taskId); }}
                        />
                        {openTaskMenuPopup === task.taskId && (
                            <TaskMenus groupId={groupId} task={task} />
                        )}
                    </div>
                </div>

                <div className={`col-2 d-flex star-div justify-content-center mt-2 ${task.isStarred ? 'always-visible text-primary' : ''}`} onClick={() => handleToggleStar(task.taskId)}><Star /></div>

            </div>

            {visibleModel && editTaskId > 0 && (
                <AddOrUpdateTask
                    visible={visibleModel}
                    setVisibility={setVisibleModel}
                    taskId={editTaskId}
                    setTaskId={setEditTaskId}
                    groupId={groupId}
                    isStarredTask={task.isStarred}
                />
            )}
        </>
    )
}
export default InCompleteTask;