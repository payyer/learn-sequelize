import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyNav from '../../components/nav/MyNav';

export default function Project() {
    const navigate = useNavigate();
    const [accout, setAccout] = useState({});
    useEffect(() => {
        let session = sessionStorage.getItem('accout');
        if (session) {
            setAccout(JSON.parse(session));
        } else {
            navigate('/');
        }
    }, [])
    return (
        <>
            <MyNav />
            <div>This is Project Page</div>
        </>
    )
}
