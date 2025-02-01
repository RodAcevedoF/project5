const API_URL = 'https://api-to-do.duckdns.org';

// Obtener token almacenado
const getToken = () => localStorage.getItem('token');

// Obtener todas las tareas
export const getTodos = async () => {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error('Error al obtener tareas');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Crear una nueva tarea
export const createTodo = async (title, description) => {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ title, description })
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// Eliminar una tarea
export const deleteTodo = async (id) => {
    try {
        await fetch(`${API_URL}/todos/${id}`, { 
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
    } catch (error) {
        console.error(error);
    }
};
