import axios from 'axios';
import { toast } from 'react-toastify';

export async function axiosData(endpoint, data) {
    const url = 'http://localhost:3001' + endpoint;
    // const url = 'https://ba46-188-43-33-250.ngrok-free.app' + endpoint;

    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    try {
        var result;
        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (response.status === 200) {
                result = response.data
            } else {
                toast.error('サーバー接続時にエラーが発生しました。')
            }
        }).catch((err) => {
            toast.error('サーバー接続時にエラーが発生しました。')
        })

        return result
    } catch (error) {
        toast.error('サーバー接続時にエラーが発生しました。')
        throw error;
    }
}

export async function fetchData(endpoint, method = 'POST', data = null) {
    const url = 'http://localhost:3001' + endpoint;

    const options = {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data, // Include data only for POST, PUT, etc.
    };

    try {
        const response = await axios(options);
        if (response.status === 200) {
            return response.data; // Return the response data
        } else {
            toast.error('サーバー接続時にエラーが発生しました。');
            return null;
        }
    } catch (error) {
        toast.error('サーバー接続時にエラーが発生しました。');
        console.error('API Error:', error);
        throw error; // Rethrow for further handling if needed
    }
}
