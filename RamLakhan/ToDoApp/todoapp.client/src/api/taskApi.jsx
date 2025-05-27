
const BASE_URL = '/Tasks';

export const GetTaskList = async () => {
    const response = await fetch(`${BASE_URL}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const GetTaskById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const AddTask = async (item) => {
    const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const UpdateTask = async (id,item) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const ToggleStarTask = async (taskId) => {
    const response = await fetch(`${BASE_URL}/${taskId}/star`, {
        method: 'PATCH'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const DeleteTask = async (taskId) => {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const MoveTaskToNewGroup = async (taskId, groupItem) => {
    const response = await fetch(`${BASE_URL}/${taskId}/move`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(groupItem),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};


