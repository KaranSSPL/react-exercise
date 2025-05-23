import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GetTaskById } from '@/api/taskApi';
import { useTaskEvents } from '../../Hooks/TaskEvents';

const AddOrUpdateTask = ({ show, setShow, onAddOrEdit, editTaskId, setEditTaskId, taskGroupId }) => {

    const {taskGroups} = useTaskEvents();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(null);
    const [isShowError, setIsShowError] = useState(false);
    const [editTaskItem, setEditTaskItem] = useState([]);
    const [groupId, setGroupId] = useState(1);


    useEffect(() => {
        (async () => {
            if (editTaskId > 0) {
                let res = await GetTaskById(editTaskId);
                if (res.isSuccess) {
                    let itemToEdit = res.data;
                    setTitle(itemToEdit.title);
                    setDescription(itemToEdit.description);
                    setDate(itemToEdit.toDoDate);
                    setEditTaskItem(itemToEdit);
                }
            }
        })();
    }, []);

    const handleClose = () => {
        setEditTaskId(0);
        setShow(false);
    }

    const handleSubmit = () => {
        let itemToAddOrEdit = {};
        const toDoDate = date ? date : null;
        if (editTaskId > 0) {
            itemToAddOrEdit = { ...editTaskItem, title: title, description: description, toDoDate: toDoDate };
        } else {
            const groupid = taskGroupId > 0 ? taskGroupId : groupId;
            itemToAddOrEdit = { taskId: 0, title: title, description: description, toDoDate: date, taskGroupId: groupid };
        }

        onAddOrEdit(itemToAddOrEdit);
        setGroupId(1);
        EmptyAllFields();
        setShow(false);
    }

    const EmptyAllFields = () => {
        setTitle('');
        setDescription('');
        setDate(null);
    }

    const HendleErrorAndSetTitleValue = (e) => {
        setTitle(e.target.value);
        if (e.target.value.trim()) {
            setIsShowError(false);
        } else {
            setIsShowError(true);
        }

    }

    return (

        <Modal show={show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{editTaskId > 0 ? "Edit task" : "Add task"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={(e) => HendleErrorAndSetTitleValue(e)}
                            type="text"
                            placeholder="enter task title"
                            autoFocus
                            value={title}
                        />
                        <Form.Text className={`text-danger ${!isShowError ? "d-none" : ""}`}>
                            please enter a text for title.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            onChange={(e) => setDescription(e.target.value)} as="textarea"
                            placeholder="enter desceription"
                            rows={3}
                            value={description}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            type="Date"
                        />
                    </Form.Group>

                    {
                        taskGroupId === 0 && editTaskId == 0 ?

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Select Task Group</Form.Label>
                                <Form.Select
                                    onChange={(e) => setGroupId(e.target.value)} aria-label="Default select example">
                                    {taskGroups.map((item) => (
                                        <option key={item.listId} value={item.listId}>{item.listName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            : ''
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=> handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={!title.trim()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddOrUpdateTask;