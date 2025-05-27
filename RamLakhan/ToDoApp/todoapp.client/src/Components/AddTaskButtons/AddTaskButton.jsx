import { useState } from 'react';
import { CircleCheckBig } from 'lucide-react';
import AddOrUpdateTask from '../AddorUpdateModel/AddOrUpdateTask';
import { GetGroups } from '../../api/TaskGroupApi';

const AddTaskButton = ({ groupId, isStarredTask }) => {
    const [visibleModel, setVisibleModel] = useState(false);
    const [groups, setGroups] = useState([]);

    const handleAdd = async () => {
        const response = await GetGroups();
        if (!response.isSuccess) {
            console.error("Failed to fetch groups:", response.message);
            return;
        }

        setGroups(response.data);
        setVisibleModel(true);
    }

    return (
        <>
            {groupId === 0 || groupId === undefined || groupId === null
                ?

                <button className="btn btn-primary global-create-btn" onClick={() => handleAdd(0)}>
                    Create +
                </button>

                :
                <button className="btn add-task-button" onClick={() => handleAdd(groupId)}><CircleCheckBig className="add-task-check" />{isStarredTask ? "Add a star task" : "Add a task"}</button>
            }

            {visibleModel &&
                <AddOrUpdateTask visible={visibleModel} setVisibility={setVisibleModel} taskId={0} groupId={groupId ?? 0} groups={groups} isStarredTask={isStarredTask} />
            }
        </>
    )
}
export default AddTaskButton;