// src/api/taskGroupApi.jsx

const BASE_URL = '/TaskGroups';

export const GetGroups = async () => {
    const response = await fetch(`${BASE_URL}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const AddGroup = async (item) => {
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

export const UpdateGroup = async (id,item) => {
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

export const GetGroupById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const DeleteGroup = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const GetGroupsTaskList = async () => {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const GetStarredTask = async () => {
    const response = await fetch(`${BASE_URL}/tasks/star`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const DeleteCompletedTask = async (groupId) => {
    const response = await fetch(`${BASE_URL}/${groupId}/complete`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};
