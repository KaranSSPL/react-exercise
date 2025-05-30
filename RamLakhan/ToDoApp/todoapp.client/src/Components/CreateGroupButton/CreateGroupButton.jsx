import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddOrUpdateGroups from '../Sidebar/AddOrUpdateGroups';

const CreateGroupButton = () => {
    const [visibleModel, setVisibleModel] = useState(false);

    return (
        <>
            <button className="btn createlist-btn" onClick={() => setVisibleModel(true)}>
                <Plus /> <span>Create new list</span>
            </button>

            {visibleModel &&
                <AddOrUpdateGroups
                visible={visibleModel}
                setVisibility={setVisibleModel}
                />
            }
        </>
    )
}
export default CreateGroupButton;
