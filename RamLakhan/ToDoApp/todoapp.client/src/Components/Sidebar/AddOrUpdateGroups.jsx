import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GetGroupById } from '@/api/TaskGroupApi';

const AddOrUpdateGroups = ({ show, setShow, handleAddorEdit, editGroupId, setEditGroupId, taskIdToMove,onMove }) => {
    const [isShowError, setIsShowError] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupData, setGroupData] = useState({});


    useEffect(() => {
        (async () => {
            if (editGroupId > 0) {
                let res = await GetGroupById(editGroupId);
                if (res.isSuccess) {

                    let itemToEdit = res.data;
                    setGroupName(itemToEdit.listName);
                    setGroupData(itemToEdit);
                }
            }

        })();
    }, []);

    const handleSubmit = () => {

        let item = {}
        if (editGroupId > 0) {
            item = { ...groupData, listName: groupName };
        } else {
            item = { listId: 0, listName: groupName, isEnableShow: true,sortBy:'My order' };
        }
        setGroupName('');
        setShow(false);

        if (taskIdToMove > 0) {
            onMove(taskIdToMove, { listId: 0, listName: groupName, isEnableShow: true, sortBy: 'My order' })
            return;
        }
        handleAddorEdit(item);
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
        if (editGroupId > 0) {
            setEditGroupId(0);
        }
        setShow(false);
        setGroupName('');
    }

    return (

        < Modal show={show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{editGroupId > 0 ? "Rename Group" : "Add Group"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Name: <input type="text" className="form-control" value={groupName} onChange={(e) => handleErrorAddGroup(e.target.value)} />
                <br />
                <span className={`${isShowError == false ? "d-none" : ""} text-danger`}>please enter value</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()} disabled={!groupName.trim()}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default AddOrUpdateGroups;