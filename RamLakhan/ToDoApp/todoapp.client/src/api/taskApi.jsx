
const BASE_URL = '/Tasks';

export const GetTaskList = async () => {
    const response = await fetch(`${BASE_URL}/task-list`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const GetTaskById = async (id) => {
    const response = await fetch(`${BASE_URL}/get/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const SaveTask = async (item) => {
    const response = await fetch(`${BASE_URL}/save-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const GetTasksByGroupId = async (groupId) => {

    const response = await fetch(`${BASE_URL}/get-taskList-by-groupId/${groupId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const GetAllGroupsTaskList = async () => {
    const response = await fetch(`${BASE_URL}/get-all-groups-taskList`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const ToggleStarTask = async (taskId) => {
    const response = await fetch(`${BASE_URL}/toggle-star/${taskId}`, {
        method: 'PUT'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const DeleteTask = async (taskId) => {
    const response = await fetch(`${BASE_URL}/delete/${taskId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const GetStarredTask = async () => {
    const response = await fetch(`${BASE_URL}/get-starred-task`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const DeleteCompletedTask = async (groupId) => {
    const response = await fetch(`${BASE_URL}/delete-completed-task/${groupId}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const MoveTaskToNewGroup = async (taskId, groupItem) => {
    const response = await fetch(`${BASE_URL}/movetask-to-newlist?taskId=${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(groupItem),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};