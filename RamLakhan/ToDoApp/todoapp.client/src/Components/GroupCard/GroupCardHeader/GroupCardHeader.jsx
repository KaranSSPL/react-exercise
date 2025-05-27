import { useEffect } from 'react';
import GroupMenuPopup from '../../GroupCardMenus/GroupMenuPopup';
import { EllipsisVertical } from 'lucide-react';

const GroupCardHeader = ({ group, isStarredList, openGroupMenuPopup, setOpenGroupMenuPopup }) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.task-group-menu') && !event.target.closest('.submenu') && !event.target.closest('.modal-dialog')) {
                setOpenGroupMenuPopup(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="group-card-header">
            <h4>{group.groupName}</h4>
            <div className="task-group-menu" tabIndex={0} role="button" aria-label="Open menu">
                <EllipsisVertical onClick={() => setOpenGroupMenuPopup(openGroupMenuPopup === group.groupId ? null : group.groupId)} />
                {openGroupMenuPopup === group.groupId && <GroupMenuPopup group={group} isStarredList={isStarredList} />}
            </div>
        </div>
    )
}
export default GroupCardHeader;