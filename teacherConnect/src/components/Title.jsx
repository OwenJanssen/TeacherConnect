import React from 'react';
import { useNavigate } from "react-router-dom";

const Title = () => {
    const nav = useNavigate();

    const returnHome = () => {    
        nav("/");
    };

    return <div className="title" onClick={returnHome}>TeacherConnect</div>
}

export default Title;
