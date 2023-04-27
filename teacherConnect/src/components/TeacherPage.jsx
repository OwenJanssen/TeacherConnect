import React, { useEffect, useState } from 'react';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { SaveHistory } from '../helper';

import StudentLink from './StudentLink';
import {routeInfo} from "../data";

function TeacherPage({ data, setData }) {
    const nav = useNavigate();

    useEffect(()=>{
        // console.log("setting current route")
        routeInfo.setCurrentRoute({route:"/teacher",name:"Teacher's Home"})
    },[])
    const addLesson = () => {
        setData(d => {
            let newD = d;
            newD["Lessons"][newD["Lessons"].length] = {
                "date": "",
                "content": "",
            };
            return newD;
        });
        SaveHistory(nav,`/teacher/lesson/${data["Lessons"].length-1}`);
    }

    const addConcept = () => {
        setData(d => {
            let newD = d;
            newD["Concepts"][newD["Concepts"].length] = {
                "date": "",
                "title": "",
                "explanation": "",
                "resources": [],
                "feedback": [],
            };
            return newD;
        });
        SaveHistory(nav,`/teacher/concept/${data["Concepts"].length-1}`);
    }

    return <div className="teacher-page">
        <Title/>
        <div className="navigation-buttons">
            
            <div className="nav-button" onClick={() => SaveHistory(nav,"/teacher/groups")}>
                Form Help Groups
            </div>
        </div>
        <div className="list-sections">
            <div className="list-section">
                <div className="section-title">
                    Lessons
                    <div className="add-button" onClick={addLesson}>
                        +
                    </div>
                </div>
                <div className="divider"/>
                <div className="list">
                    {data["Lessons"].map((lesson, i) => 
                        <div key={i} onClick={() => SaveHistory(nav,`/teacher/lesson/${i}`)}>
                            {`${lesson["date"]}: ${lesson["title"]}`}
                        </div>
                    )}
                </div>
            </div>
            <div className="list-section">
                <div className="section-title">
                    Concepts
                    <div className="add-button" onClick={addConcept}>
                        +
                    </div>
                </div>
                <div className="divider"/>
                <div className="list">
                    {data["Concepts"].map((concept, i) => 
                        <div key={i} onClick={() => SaveHistory(nav,`/teacher/concept/${i}`)}>
                            {`${concept["date"]}: ${concept["title"]}`}
                        </div>
                    )}
                </div>
            </div>
            <div className="list-section">
                <div className="section-title">Students</div>
                <div className="divider"/>
                <div className="list">
                    {data["Students"].map(student => <StudentLink userClass="teacher" studentName={student["name"]} key={student["name"]}/>)}
                </div>
            </div>
        </div>
    </div>
}

export default TeacherPage;
