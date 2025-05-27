import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GetTaskById, AddTask, UpdateTask } from '@/api/taskApi';
import { useTaskEvents } from '../../Hooks/TaskEvents';

const AddOrUpdateTask = ({ visible, setVisibility, taskId, setTaskId, groupId, groups, isStarredTask }) => {

    const { RefreshTaskLists } = useTaskEvents();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isShowError, setIsShowError] = useState(false);
    const [editTaskItem, setEditTaskItem] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(1);


    useEffect(() => {
        (async () => {
            if (taskId > 0) {
                let res = await GetTaskById(taskId);
                if (res.isSuccess) {
                    let itemToEdit = res.data;
                    setTitle(itemToEdit.title ?? '');
                    setDescription(itemToEdit.description ?? '');
                    setDate(itemToEdit.toDoDate ?? '');
                    setEditTaskItem(itemToEdit);
                }
            }
        })();
    }, []);

    const handleClose = () => {
        setTaskId && setTaskId(0);
        setVisibility(false);
    }

    const handleSubmit = async () => {
        let response = {};
        const toDoDate = date?.trim() ? date : null;

        if (taskId > 0) {
            response = await UpdateTask(taskId, { ...editTaskItem, title: title, description: description, toDoDate: toDoDate });
        } else {
            const isStarred = isStarredTask === null || isStarredTask === undefined || !isStarredTask ? false : isStarredTask;
            const groupid = groupId > 0 ? groupId : selectedGroupId;
            response = await AddTask({ taskId: 0, title: title, description: description, toDoDate: toDoDate, taskGroupId: groupid, isStarred: isStarred });
        }

        if (!response.isSuccess) {
            console.log("Error while adding or updating task", response);
            return;
        }

        setSelectedGroupId(1);
        EmptyAllFields();
        setVisibility(false);

        await RefreshTaskLists();
    }

    const EmptyAllFields = () => {
        setTitle('');
        setDescription('');
        setDate('');
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

        <Modal show={visible} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{taskId > 0 ? "Edit task" : "Add task"}</Modal.Title>
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
                        groupId === 0 && taskId == 0 ?

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Select Task Group</Form.Label>
                                <Form.Select
                                    onChange={(e) => setSelectedGroupId(e.target.value)} aria-label="Default select example">
                                    {groups.map((item) => (
                                        <option key={item.listId} value={item.listId}>{item.listName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            : ''
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
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