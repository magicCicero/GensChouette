import axios from 'axios';
import { toast } from 'react-toastify';

export async function axiosData(endpoint, data) {
    // const url = 'http://localhost:3001' + endpoint;
    const url = 'https://d870-188-43-33-250.ngrok-free.app' + endpoint;


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

export async function fetchData(endpoint, method = 'POST', data) {
    // const url = 'http://localhost:3001' + endpoint;
    const url = 'https://d870-188-43-33-250.ngrok-free.app' + endpoint;


    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    try {
        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (result) => {
            if (result.status === 200) {
                return result.data
            } else {
                toast.error('サーバー接続時にエラーが発生しました。')
            }
        }).catch((err) => {
            toast.error('サーバー接続時にエラーが発生しました。')
        })
    } catch (error) {
        toast.error('サーバー接続時にエラーが発生しました。')
        throw error;
    }
}
