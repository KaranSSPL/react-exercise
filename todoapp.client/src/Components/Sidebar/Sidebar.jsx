import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronUp, Plus, Star, CircleCheckBig } from 'lucide-react';
import { Link } from "react-router-dom";
import { SaveGroup } from '@/api/TaskGroupApi';
import { GetAllGroupsTaskList } from '@/api/TaskApi';
import { useTaskEvents } from '../../Hooks/TaskEvents';
import { GetPath } from '../../global/Helper';
import AddOrUpdateGroups from './AddOrUpdateGroups';
import AddOrUpdateTask from '../Dashboard/AddOrUpdateTask';

export default function Sidebar() {

    const {
        showAddorEditTaskModel, setShowAddorEditTaskModel,
        showAddorEditGroupModel, setShowAddorEditGroupModel,
        setTaskIdForEdit,
        hendleAddOrEdit,
        handleAddTask,
        taskGroups,
        setTaskGroups,
        setAllGroupTaskList,
        hideSidebar,
        updateGroupsTaskList,
        updateGroups
    } = useTaskEvents();


    const [isCollapse, setIsCollapse] = useState(false);

    /* Add Group */
    const handleAddorEditGroup = async (item) => {
        try {
            const result = await SaveGroup(item);
            if (result.isSuccess) {

                await updateGroupsTaskList();
                await updateGroups();
            }
        } catch (error) {
            console.error('Error creating list:', error);
        }
    }

    /* show/hide list submenu  */
    const hendleCollapse = () => {
        setIsCollapse(!isCollapse);
    }

    const hendleCheckGroup = async (groupId) => {
        const existed = taskGroups.find(item => item.listId == groupId);
        if (existed && existed.listName?.trim()) {
            const itemsToUpdate = { ...existed, isEnableShow: !existed.isEnableShow };
            const result = await SaveGroup(itemsToUpdate);

            if (result.isSuccess) {

                const updatedTaskGroups = taskGroups.map(item =>
                    item.listId === groupId ? itemsToUpdate : item
                );

                setTaskGroups(updatedTaskGroups);

                const res = await GetAllGroupsTaskList();
                if (res.isSuccess) {
                    setAllGroupTaskList(res.data);
                } else {
                    console.error("Failed or unexpected response:", res.message, res.data);
                }
            }
        }

    }
    return (
        <div className={`sidebar ${hideSidebar ? "hide" : ""}`}>
            <ul>
                <li>
                    <button className="btn btn-primary global-create-btn" onClick={() => handleAddTask(0)}>
                        Create +
                    </button>
                </li>

                <li className={`d-flex ${GetPath() === '/' ? 'active' : ''}`}>
                    <CircleCheckBig />
                    <Link className={`btn nav-link`} to="/">
                        All tasks
                    </Link>
                </li>

                <li className={`d-flex ${GetPath() === '/starred' ? 'active' : ''}`}>
                    <Star />
                    <Link className={`btn nav-link`} to="/starred">
                        Starred
                    </Link>
                </li>

                <li>
                    <button onClick={hendleCollapse} className="btn">
                        List {isCollapse == false ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <ul className={`submenu ${isCollapse == true ? 'collapse' : ''}`}>
                        {taskGroups.length > 0 &&
                            taskGroups.map(item => (
                                <li key={item.listId} className="submenu-item"> <input className="checkinput" type="checkbox" checked={item.isEnableShow} onChange={() => hendleCheckGroup(item.listId)} /> <span>{item.listName}</span> </li>
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <button className="btn createlist-btn" onClick={() => setShowAddorEditGroupModel(true)}>
                        <Plus /> <span>Create new list</span>
                    </button>
                </li>
            </ul>

            {showAddorEditGroupModel &&
                <AddOrUpdateGroups
                    show={showAddorEditGroupModel}
                    setShow={setShowAddorEditGroupModel}
                    handleAddorEdit={handleAddorEditGroup}
                    editGroupId={0}
                    taskIdToMove={0}
                />
            }

            {showAddorEditTaskModel &&
                <AddOrUpdateTask
                    show={showAddorEditTaskModel}
                    setShow={setShowAddorEditTaskModel}
                    onAddOrEdit={hendleAddOrEdit}
                    editTaskId={0}
                    setEditTaskId={setTaskIdForEdit}
                    taskGroupId={0}
                />
            }
        </div>
    );
}

