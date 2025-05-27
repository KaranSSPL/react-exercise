import { useState, useEffect } from 'react';
import { useTaskEvents } from '../../Hooks/TaskEvents';
import { GetGroups, UpdateGroup } from '../../api/TaskGroupApi';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Form from 'react-bootstrap/Form';

const HandleVisibleGroups = () => {
    const { taskGroups, setTaskGroups, allGroupTaskList, setAllGroupTaskList } = useTaskEvents();
    const [isCollapse, setIsCollapse] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await GetGroups();
            if (!response.isSuccess) {
                console.error("Failed to fetch groups:", response.message);
            }
            setTaskGroups(response.data);
        })();
    }, []);

    const HandleVisibilityCheck = async (groupId) => {
        const group = taskGroups.find(item => item.listId === groupId);
        if (group) {
            const updatedGroup = { ...group, isEnableShow: !group.isEnableShow };
            const result = await UpdateGroup(updatedGroup.listId, updatedGroup);
            if (!result.isSuccess) {
                console.error("Failed to update group visibility:", result.message);
            }

            const updatedTaskGroups = taskGroups.map(item =>
                item.listId === groupId ? updatedGroup : item
            );
            setTaskGroups(updatedTaskGroups);

            if (allGroupTaskList && allGroupTaskList?.length > 0) {

                const updatedGroupsTaskList = allGroupTaskList.map(group => {
                    const isGroupVisible = updatedTaskGroups.find(item => item.listId === group.groupId)?.isEnableShow;
                    if (group.groupId === groupId) {
                        return { ...group, isEnableShow: isGroupVisible };
                    } else {
                        return { ...group }
                    }
                })
                setAllGroupTaskList(updatedGroupsTaskList);
            }

        }
    }

    const countTask = (groupId) => {
        if (!allGroupTaskList || allGroupTaskList.length === 0) return 0;
        const group = allGroupTaskList.find(item => item.groupId === groupId);
        return group && group.taskList.length;
    }

    return (
        <>
            <button onClick={() => setIsCollapse(!isCollapse)} className="btn grouplist w-100">
                List {isCollapse == false ? <ChevronUp /> : <ChevronDown />}
            </button>
            <ul className={`submenu ${isCollapse == true ? 'collapse' : ''}`}>
                {taskGroups.length > 0 &&
                    taskGroups.map(item => (

                        <li key={item.listId} className="submenu-item">
                            <div className="row d-flex justify-content-center">
                                {/*<div className="col-1 mt-1 text-left">
                                    <input className="checkinput" type="checkbox" checked={item.isEnableShow} onChange={() => HandleVisibilityCheck(item.listId)} />
                                </div>*/}

                                <div className="col-10 text-left">
                                    <Form.Check type="switch" id="custom-switch" checked={item.isEnableShow} onChange={() => HandleVisibilityCheck(item.listId)} label={item.listName} />
                                    {/*<span>{item.listName}</span>*/}
                                </div>

                                <div className="col-2 text-end"><span className="group-count">{countTask(item.listId)}</span></div>
                            </div>

                        </li>
                    ))
                }
            </ul>
        </>
    )
}
export default HandleVisibleGroups;