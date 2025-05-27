import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddGroup, UpdateGroup, GetGroupById, GetGroups, GetGroupsTaskList, GetStarredTask } from '@/api/TaskGroupApi';
import { MoveTaskToNewGroup } from '../../api/TaskApi';
import { useTaskEvents } from '../../Hooks/TaskEvents';

const AddOrUpdateGroups = ({ visible, setVisibility, groupId, taskIdToMove }) => {
    const {setTaskGroups, setAllGroupTaskList, setallStarredTasks} = useTaskEvents();
    const [isShowError, setIsShowError] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupData, setGroupData] = useState({});

    useEffect(() => {
        (async () => {
            if (groupId > 0) {
                let res = await GetGroupById(groupId);
                if (res.isSuccess) {

                    let itemToEdit = res.data;
                    setGroupName(itemToEdit.listName ?? '');
                    setGroupData(itemToEdit);
                }
            }

        })();
    }, []);


    const handleSubmit = async () => {

        let response = {}

        if (taskIdToMove && taskIdToMove != null && taskIdToMove != undefined && taskIdToMove > 0) {
            response = await MoveTaskToNewGroup(taskIdToMove, { listId: 0, listName: groupName, isEnableShow: true, sortBy: 'My order' });
            if (!response.isSuccess) {
                console.error("error while moving task to new group ", response);
                return;
            }

        } else {

            if (groupId > 0) {
                response = await UpdateGroup(groupId, { ...groupData, listName: groupName });
            } else {
                response = await AddGroup({ listId: 0, listName: groupName, isEnableShow: true, sortBy: 'My order' });
            }

            if (!response.isSuccess) {
                console.log("Error while adding or updating group", response);
                return;
            }
        }

        setGroupName('');
        setVisibility(false);
        await refreshGroupData();

    }

    /*handle add list*/
    const handleErrorAddGroup = (value) => {
        setGroupName(value);
        if (!value) {
            setIsShowError(true);
        } else {
            setIsShowError(false);
        }
    }

    const handleClose = () => {
        setVisibility(false);
        setGroupName('');
    }

    const refreshGroupData = async () => {
        let response = {};
        response = await GetGroups();
        if (response.data && response.data.length > 0) {
            setTaskGroups(response.data);
        }

        response = await GetGroupsTaskList();
        if (!response.isSuccess)
            console.error("Failed or unexpected response:", response);
        setAllGroupTaskList(response.data);

        response = await GetStarredTask();
        if (!response.isSuccess)
            console.error("Failed or unexpected response:", response.message, response.data);

        setallStarredTasks(response.data);
    }

    return (

        < Modal show={visible} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{groupId > 0 ? "Rename Group" : "Add Group"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Name: <input type="text" autoFocus className="form-control" value={groupName} onChange={(e) => handleErrorAddGroup(e.target.value)} />
                <br />
                <span className={`${isShowError == false ? "d-none" : ""} text-danger`}>please enter value</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()} disabled={!groupName?.trim()}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default AddOrUpdateGroups;