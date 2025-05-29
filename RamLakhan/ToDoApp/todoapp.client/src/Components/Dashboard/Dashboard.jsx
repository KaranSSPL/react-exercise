import { useEffect, useState } from 'react';
import { GetGroupsTaskList } from '../../api/TaskGroupApi';
import { useTaskEvents } from '@/Hooks/TaskEvents';
import GroupCard from '../GroupCard/GroupCard';

const Dashboard = () => {
    const { hideSidebar, allGroupTaskList, setAllGroupTaskList } = useTaskEvents();
    const [openGroupMenuPopup, setOpenGroupMenuPopup] = useState(null);
    const [openTaskMenuPopup, setOpenTaskMenuPopup] = useState(null);
    const [responseError, setResponseError] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await GetGroupsTaskList();
            if (!response.isSuccess) {
                console.error("Failed or unexpected response:", response.message, response.data);
                setResponseError(`Error! ${response.message}`)
                return;
            }
            setAllGroupTaskList(response.data);
        })();
    }, []);


    return (

        <div className={`content ${hideSidebar ? "sidebar-hidden" : ""}`}>
            <div className="task-scroll-container">
                {responseError != null ? <div className="text-center text-danger"><h4>{responseError}</h4></div>
                    :
                    <div className="task-scroll">
                        {
                            allGroupTaskList && allGroupTaskList.length > 0 &&
                            allGroupTaskList.map(groupItem => (
                                <GroupCard
                                    key={groupItem.groupId}
                                    group={groupItem}
                                    isStarredList={false}
                                    openGroupMenuPopup={openGroupMenuPopup}
                                    setOpenGroupMenuPopup={setOpenGroupMenuPopup}
                                    openTaskMenuPopup={openTaskMenuPopup}
                                    setOpenTaskMenuPopup={setOpenTaskMenuPopup} />
                            ))
                        }
                    </div>
                }
            </div >
        </div>
    )
}

export default Dashboard;