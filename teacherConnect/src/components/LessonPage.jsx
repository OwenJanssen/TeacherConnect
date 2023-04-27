import React, { useState,useEffect  } from 'react';
import Title from './Title';
import { useNavigate, useParams } from 'react-router-dom';
import { routeInfo } from '../data';
import { SaveHistory } from '../helper';

export const LessonPage = ({ data, setData }) => {
    const nav = useNavigate();
    const { lessonId, userClass } = useParams();
    const lesson = data["Lessons"][lessonId];
    console.log("DEBUG, lesson is",lessonId)
    const isTeacher = userClass == "teacher";
    const [image, setImage] = useState("/whiteboard.png")

    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(()=>{
        routeInfo.setCurrentRoute({
            name:`${userClass} Lessons`,
            route:`/${userClass}/lesson/${lessonId}`
        })
    },[])
    const handleTitleChange = (event) => {
        setData(d => {
            let newD = {...d};
            newD["Lessons"][lessonId]["title"] = event.target.value;
            return newD;
        })
    };

    const handleDateChange = (event) => {
        setData(d => {
            let newD = {...d};
            newD["Lessons"][lessonId]["date"] = event.target.value;
            return newD;
        })
    };
      
    const addNewConcept = () => {
        setData(d => {
            let newD = d;
            const index = newD["Concepts"].length;
            newD["Concepts"][index] = {
                "date": "",
                "title": "",
                "explanation": "",
                "resources": [],
                "feedback": [],
            };
            newD["Lessons"][lessonId]["concepts"].push(index);
            return newD;
        });
        nav(`/teacher/concept/${data["Concepts"].length-1}`);
    };

    return <div className="lesson-page">
        <Title/>
        {isTeacher ? 
            <>
                <div className="title-text">Lesson Title:</div>
                <textarea className="concept-title" value={lesson["title"]} onChange={handleTitleChange}/>
                <div className="date-text">Date:</div>
                <textarea className="concept-date" value={lesson["date"]} onChange={handleDateChange}/>
            </> :
            <>
                <div className="concept-title">{lesson["title"]}</div>
                <div className="concept-date">{lesson["date"]}</div>
            </>
        }

        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <div className="section">
                <div className="section-text">Concepts</div>
                <div className={isTeacher ? "concepts-section-teacher" : "concepts-section"}>            
                    {lesson["concepts"].map(concept_i => 
                        {
                            return <div className="concept" key={concept_i} onClick={() => SaveHistory(nav,`/teacher/concept/${concept_i}`)}>
                                {data["Concepts"][concept_i]["title"]}
                            </div>
                        }
                    )}
                    {isTeacher && <>
                        <div className="concept" onClick={() => setPopupOpen(p => !p)}>+ Add Existing Concept +</div>
                        <div className="concept" onClick={addNewConcept}>+ Add New Concept +</div>
                    </>}
                </div>
            </div>
            <div className="section">
                <div className="section-text">
                    Notes
                    {isTeacher && <div className="upload-notes">📤</div>}
                </div>
                <img src={image}/>
            </div>
        </div>

        {popupOpen &&
            <>
                <div className="background-blur"/>
                <div className="existing-concept-popup">
                    <div className="popup-header">Add Existing Concept</div>
                    <div className="popup-inner">
                        {data["Concepts"].filter((_, i) => !data["Lessons"][lessonId]["concepts"].includes(i)).map((concept, index) => {
                            return <div className="concept-option" key={index} onClick={() => addExistingConcept(index)}>
                                {concept["title"]}
                            </div>
                        })}
                        {data["Concepts"].filter((_, i) => !data["Lessons"][lessonId]["concepts"].includes(i)).length == 0 &&  
                            <div className="all-concepts-added">
                                All existing concepts have been added.
                            </div>
                        }
                    </div>
                    <div className="popup-footer">
                        <button className="popup-button" onClick={() => setPopupOpen(false)}>Cancel</button>
                    </div>
                </div>
            </>
        }
    </div>
};

export default LessonPage;