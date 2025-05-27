import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import CompletedTask from './CompletedTask';

const CompletedTaskList = ({ groupId, completedTaskList, onComplete }) => {
    const [openCompletedGroupId, setOpenCompletedGroupId] = useState(null);

    return (
        <>
            <div className="completed-task">
                <button className="btn" onClick={() => setOpenCompletedGroupId(openCompletedGroupId === groupId ? null : groupId)}>
                    {
                        openCompletedGroupId === groupId ? <ChevronDown /> : <ChevronRight />
                    }
                    Completed </button>
                {
                    completedTaskList.map(completeTask => (

                        openCompletedGroupId === groupId &&
                        <CompletedTask key={completeTask.taskId} groupId={groupId} task={completeTask} onComplete={onComplete} />

                    ))
                }
            </div>

           
        </>
    )
}

export default CompletedTaskList;