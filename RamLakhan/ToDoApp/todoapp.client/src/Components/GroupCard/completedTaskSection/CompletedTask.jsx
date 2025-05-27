import { useState } from "react";
import { DeleteTask } from "../../../api/TaskApi";
import { Check, Trash2 } from 'lucide-react';
import { FormateDate } from "../../../global/Helper";
import AddOrUpdateTask from "../../AddorUpdateModel/AddOrUpdateTask";
import { useTaskEvents } from "../../../Hooks/TaskEvents";

const CompletedTask = ({ groupId, task, onComplete }) => {
    const { RefreshTaskLists } = useTaskEvents();
    const [editTaskId, setEditTaskId] = useState(0);
    const [visibleModel, setVisibleModel] = useState(false);

    const handleEditTask = (taskId) => {
        setEditTaskId(taskId);
        setVisibleModel(true);
    }

    // Delete task handler 
    const handleDeleteTask = async (taskId) => {
        const res = await DeleteTask(taskId);
        if (!res.isSuccess) {
            console.error("error while delete task", res);
            return;
        }

        await RefreshTaskLists();
    };
    return (
        <>
            <div key={task.taskId} className="row">
                <div className="col-1 mt-2" onClick={() => onComplete(task, false)}> <Check /></div>
                <div className="col-9 task-details mt-2"
                    onClick={() => handleEditTask(task.taskId)}>
                    <div className="task-title">
                        <del>
                            {task.title}
                        </del>
                    </div>

                    {task.description?.trim() &&

                        <div className="task-description">
                            {task.description}
                        </div>
                    }
                    {task.toDoDate?.trim() &&

                        <div className="task-date">
                            Completed: {FormateDate(task.toDoDate)}
                        </div>
                    }
                </div>

                <div className="col-2 delete-complete-icon d-flex justify-content-center" >
                    <Trash2 className="delete-complete-task" onClick={() => handleDeleteTask(task.taskId)} />
                </div>

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
export default CompletedTask;