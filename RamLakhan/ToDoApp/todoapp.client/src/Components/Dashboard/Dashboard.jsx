import React, { useEffect } from 'react'
import { GetGroupsTaskList } from '../../api/TaskGroupApi';
import { useTaskEvents } from '@/Hooks/TaskEvents';
import { GroupCard } from '../index';

const Dashboard = () => {
    const { allGroupTaskList, setAllGroupTaskList } = useTaskEvents();

    useEffect(() => {
        (async () => {
            const response = await GetGroupsTaskList();
            if (!response.isSuccess) {
                console.error("Failed or unexpected response:", response.message, response.data);
            }
            setAllGroupTaskList(response.data);
        })();
    }, []);


    return (
        <div className="row g-4">
            {
                allGroupTaskList && allGroupTaskList.length > 0 &&
                allGroupTaskList.map(groupItem => (
                    <GroupCard
                        key={groupItem.groupId}
                        group={groupItem}
                        isStarredList={false} />
                ))
            }
        </div>
    )
}

export default Dashboard;
