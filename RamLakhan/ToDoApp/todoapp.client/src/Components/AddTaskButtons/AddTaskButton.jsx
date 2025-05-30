import { useState } from 'react';
import { CircleCheckBig } from 'lucide-react';
import AddOrUpdateTask from '../AddorUpdateModel/AddOrUpdateTask';
import { useTaskEvents } from '../../Hooks/TaskEvents' 

const AddTaskButton = ({ groupId, isStarredTask }) => {
    const { taskGroups } = useTaskEvents();
    const [visibleModel, setVisibleModel] = useState(false);

    return (
        <>
            {groupId === 0 || groupId === undefined || groupId === null
                ?

                <button className="btn btn-primary global-create-btn" onClick={() => setVisibleModel(true)}>
                    Create +
                </button>

                :
                <button className="btn add-task-button" onClick={() => setVisibleModel(true)}><CircleCheckBig className="add-task-check" />{isStarredTask ? "Add a star task" : "Add a task"}</button>
            }

            {visibleModel &&
                <AddOrUpdateTask visible={visibleModel} setVisibility={setVisibleModel} taskId={0} groupId={groupId ?? 0} groups={taskGroups} isStarredTask={isStarredTask} />
            }
        </>
    )
}
export default AddTaskButton;