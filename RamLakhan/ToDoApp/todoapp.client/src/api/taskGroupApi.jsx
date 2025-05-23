// src/api/taskGroupApi.jsx

const BASE_URL = '/TaskGroups';

export const SaveGroup = async (item) => {
    const response = await fetch(`${BASE_URL}/save-group`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const GetAllGroupList = async () => {
    const response = await fetch(`${BASE_URL}/task-group-list`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const GetGroupById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const DeleteGroup = async (id) => {
    const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

