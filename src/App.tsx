import React, {FC, useState, useEffect} from 'react';
import CustomInput from "./CustomInput";
import {getUsers, User} from "./getUsers";
import './App.css';

interface AppProps {
    children?: React.ReactNode
}

const App: FC<AppProps> = () => {
    const [text, setText] = useState('');
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUsers();
            setUser(user)
        }

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }


    return <div>
        {user && <p>username: {user.name}</p>}
        <CustomInput value={text} onChange={handleChange}>
            input:
        </CustomInput>
        <p>You typed: {text ? text : '...'}</p>
    </div>
}

export default App;
