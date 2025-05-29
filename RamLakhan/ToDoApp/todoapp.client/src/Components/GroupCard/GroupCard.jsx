import { useTaskEvents } from '../../Hooks/TaskEvents';
import { UpdateTask } from '../../api/TaskApi';
import AddTaskButton from '../AddTaskButtons/AddTaskButton';
import GroupCardHeader from '../GroupCard/GroupCardHeader/GroupCardHeader';
import InCompleteTask from './InCompleteTask/InCompleteTask';
import CompletedTaskList from './completedTaskSection/CompletedTaskList';
import NoTaskYetMessage from '../NoTaskYetMessage/NoTaskYetMessage';
import TaskCompletedMessage from '../AllTaskCompletedMessage/TaskCompletedMessage';


const GroupCard = ({ group, isStarredList, openGroupMenuPopup, setOpenGroupMenuPopup, openTaskMenuPopup, setOpenTaskMenuPopup }) => {

    const { RefreshTaskLists } = useTaskEvents();

    // mark complete or uncomplete a task
    const handleCompleteTask = async (task, isComplete = true) => {

        let response = await UpdateTask(task.taskId, { ...task, isCompleted: isComplete });
        if (!response.isSuccess) {
            console.error("error while updating task for complete or uncomplete", response);
            alert(`Error! ${response.message}`);
            return;
        }

        await RefreshTaskLists();
    };

    return (
        group.isEnableShow &&

        <div key={group.groupId} className="group-card">

            <GroupCardHeader group={group} isStarredList={isStarredList} openGroupMenuPopup={openGroupMenuPopup}
                setOpenGroupMenuPopup={setOpenGroupMenuPopup} />

            <AddTaskButton groupId={group.groupId} isStarredTask={isStarredList} />

            <div className="group-card-body">
                {
                    group.taskList && group.taskList.length > 0 ?
                        <div className="incomplete-task">
                            {
                                group.taskList.map(task => (<InCompleteTask
                                    key={task.taskId}
                                    groupId={group.groupId}
                                    task={task}
                                    onComplete={handleCompleteTask}
                                    openTaskMenuPopup={openTaskMenuPopup}
                                    setOpenTaskMenuPopup={setOpenTaskMenuPopup} />))
                            }
                        </div> :
                        group.completedTaskList && group.completedTaskList.length > 0 ?
                            <TaskCompletedMessage />
                            :
                            <NoTaskYetMessage />
                }

                {
                    group.completedTaskList && group.completedTaskList.length > 0 &&
                    <CompletedTaskList groupId={group.groupId} completedTaskList={group.completedTaskList} onComplete={handleCompleteTask} />
                }

            </div>
        </div>
    )
}
export default GroupCard;