import { useEffect, useState } from 'react';
import { useTaskEvents } from '../../Hooks/TaskEvents';
import { GetStarredTask } from '../../api/TaskGroupApi';
import GroupCard from '../GroupCard/GroupCard';

const Starred = () => {
    const { hideSidebar, allStarredTasks, setallStarredTasks } = useTaskEvents();
    const [openGroupMenuPopup, setOpenGroupMenuPopup] = useState(null);
    const [openTaskMenuPopup, setOpenTaskMenuPopup] = useState(null);
    const [responseError, setResponseError] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await GetStarredTask();
            if (!response.isSuccess) {
                console.error("Failed or unexpected response:", response);
                setResponseError(`Error! ${response.message}`);
                return;
            }
            setallStarredTasks(response.data);
        })();
    }, []);


    return (
        <div className={`content ${hideSidebar ? "sidebar-hidden" : ""}`}>
            <div className="task-scroll-container">
                {responseError != null ? <div className="text-center text-danger"><h4>{responseError}</h4></div>
                    :
                    <div className="task-scroll m-auto">
                    {allStarredTasks && <GroupCard
                        key={allStarredTasks.groupId}
                        group={allStarredTasks}
                        isStarredList={true}
                        openGroupMenuPopup={openGroupMenuPopup}
                        setOpenGroupMenuPopup={setOpenGroupMenuPopup}
                        openTaskMenuPopup={openTaskMenuPopup}
                        setOpenTaskMenuPopup={setOpenTaskMenuPopup} />}
                    </div>
                }
            </div>
        </div>
    )
}

export default Starred;