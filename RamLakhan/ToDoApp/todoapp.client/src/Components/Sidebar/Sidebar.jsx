import 'bootstrap/dist/css/bootstrap.min.css';
import { useTaskEvents } from '../../Hooks/TaskEvents';
import { GetPath } from '../../global/Helper';
import AddTaskButton from '../AddTaskButtons/AddTaskButton';
import AllTaskButton from '../AllTaskButton/AllTaskButton';
import StarredButton from '../StarredTasksButton/StarredButton';
import HandleVisibleGroups from '../HandleVisibleGroups/HandleVisibleGroups';
import CreateGroupButton from '../CreateGroupButton/CreateGroupButton';

export default function Sidebar() {

    const {
        hideSidebar
    } = useTaskEvents();


    return (
        <div className={`sidebar ${hideSidebar ? "hide" : ""}`}>
            <ul>
                <li>
                    <AddTaskButton />
                </li>

                <li className={`d-flex ${GetPath() === '/' ? 'active' : ''}`}>
                    <AllTaskButton />
                </li>

                <li className={`d-flex ${GetPath() === '/starred' ? 'active' : ''}`}>
                    <StarredButton />
                </li>

                <li className="p-0">
                    <HandleVisibleGroups />
                </li>
                <li>
                    <CreateGroupButton />
                </li>
            </ul>
        </div>
    );
}

