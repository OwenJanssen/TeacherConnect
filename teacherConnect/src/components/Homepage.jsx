import React from 'react';
import { useNavigate } from 'react-router-dom';
import pencil_icon from '../assets/pencil_icon.svg';

const Homepage = ({  }) => {
    const navigate = useNavigate();
    
    const nextPage = (newUserClass) => {
        // navigate("/concept/0/student");
        // return;
        switch (newUserClass) {
            case 'TEACHER':
              navigate('/teacher');
              break;
            case 'PARENT':
                navigate('/parent');
              break;
            case 'STUDENT':
                navigate('/student');
              break;
            default:
              console.error(`Invalid user class: ${newUserClass}`);
          }
    };

    return <div className="homepage">
        <div className="welcome-text">Welcome to TeacherConnect!</div>
        <img src={pencil_icon} className="logo" alt="Pencil logo" />
        <div className="user-class-buttons">
            <button
                className="user-class-button"
                onClick={() => nextPage('TEACHER')}
            >
                Teacher
            </button>

            <button
                className="user-class-button"
                onClick={() => nextPage('PARENT')}
            >
                Parent
            </button>

            <button
                className="user-class-button"
                onClick={() => nextPage('STUDENT')}
            >
                Student
            </button>
        </div>
    </div>
};

export default Homepage;
