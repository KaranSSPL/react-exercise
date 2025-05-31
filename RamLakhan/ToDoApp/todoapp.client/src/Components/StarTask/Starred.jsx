import { useEffect } from 'react';
import { useTaskEvents } from '../../Hooks/TaskEvents';
import { GetStarredTask } from '../../api/TaskGroupApi';
import { GroupCard } from '../index';

const Starred = () => {
    const { allStarredTasks, setallStarredTasks } = useTaskEvents();
    useEffect(() => {
        (async () => {
            const response = await GetStarredTask();
            if (!response.isSuccess) {
                console.error("Failed or unexpected response:", response.message, response.data);
            }
            setallStarredTasks(response.data);
        })();
    }, []);

    return (
        <div className="row g-4">
            {allStarredTasks &&
                <GroupCard
                    key={allStarredTasks.groupId}
                    group={allStarredTasks}
                    isStarredList={true}
                />}
        </div>
    )
}

export default Starred;