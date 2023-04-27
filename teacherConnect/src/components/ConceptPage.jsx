import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from './Title';
import StudentLink from './StudentLink';
import { routeInfo } from '../data';

const UnderstandingGraph = ({ feedback, userClass }) => {
    const [selected, setSelected] = useState(4);
    const understandingLevels = Array.from({ length: 5 }, (_, i) => i + 1);
    const understandingCounts = understandingLevels.map(level =>
        feedback.filter(student => student.understanding === level).length
    );
    
    const handleClick = (index) => {
      setSelected(index);
    };
  
    return <div className="graph-container">
        <div className="graph">
            {understandingLevels.map((level, index) => (
                <div
                    key={index}
                    className={`bar${selected === index ? ' selected' : ''}`}
                    style={{ height: `${understandingCounts[index] * 30}px` }}
                    onClick={() => handleClick(index)}
                >
                    <div className="label">{level}</div>
                </div>
            ))}
        </div>
        {selected !== null && (
            <div className="students-list">
                {feedback.filter(student => student.understanding === understandingLevels[selected]).map((student, index) => (
                    <div className="student">
                        <StudentLink userClass={userClass} studentName={student.name}/>
                    </div>
                ))}
            </div>
        )}
    </div>
};

function ConceptPage({ data, setData }) {
    const { conceptId, userClass } = useParams();
    const concept = data["Concepts"][conceptId];
    const isTeacher = userClass == "teacher";

    const [showAddResource, setShowAddResource] = useState(false);
    const [resourceName, setResourceName] = useState("");
    const [resourceType, setResourceType] = useState("video");
    const [resourceLink, setResourceLink] = useState("");

    useEffect(()=>{        
        routeInfo.setCurrentRoute({name:"Concept Page",route:`${userClass}/concept/${conceptId}`})
    },[])
    const addResource = () => {
        setShowAddResource(s => !s);
    };

    const handleAddResource = (event) => {
        const newResource = {
            name: resourceName,
            type: resourceType,
            link: resourceLink,
        };
        concept.resources.push(newResource);
        setData(d => {
            let newD = {...d};
            newD["Concepts"][conceptId]["resources"].push(newResource);
            return newD;
        });
        setShowAddResource(false); // Close the popup
        setResourceName("");
        setResourceType("video");
        setResourceLink("");
    };

    const handleTitleChange = (event) => {
        setData(d => {
            let newD = {...d};
            newD["Concepts"][conceptId]["title"] = event.target.value;
            return newD;
        })
    };

    const handleDateChange = (event) => {
        setData(d => {
            let newD = {...d};
            newD["Concepts"][conceptId]["date"] = event.target.value;
            return newD;
        })
    };

    const handleExplanationChange = (event) => {
        setData(d => {
            let newD = {...d};
            newD["Concepts"][conceptId]["explanation"] = event.target.value;
            return newD;
        })
    };

    return <div className="concept-page">
        <Title/>
        {isTeacher ? 
            <>
                <div className="title-text">Concept Title:</div>
                <textarea className="concept-title" value={concept["title"]} onChange={handleTitleChange}/>
                <div className="date-text">Date:</div>
                <textarea className="concept-date" value={concept["date"]} onChange={handleDateChange}/>
            </> :
            <>
                <div className="concept-title">{concept["title"]}</div>
                <div className="concept-date">{concept["date"]}</div>
            </>
        }
       
        {isTeacher ? 
            <div className="explanation">
                Explanation:{" "}
                <textarea className="edit-explanation-textarea" value={[concept["explanation"]]} onChange={handleExplanationChange}/>
            </div> : 
            <div className="explanation">
                Explanation:{" "}
                <div className="concept-explanation-container">
                    {concept["explanation"]}
                </div>
            </div>
        }

        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <div className="section">
                <div className="section-text">Resources</div>

                <div className={isTeacher ? "resources-section-teacher" : "resources-section"}>            
                    {concept["resources"].map((resource, i) => 
                        <a key={i} href={"https://" + resource["link"]} className="resource-link">
                            {resource["type"] === "video" ? "🎥 " : resource["type"] === "problem" ? "📝 " : ""}
                            {resource["name"]}
                        </a>
                    )}

                    {isTeacher && <>
                        <div className="resource-link" onClick={addResource}>+ Add Resource +</div>
                        {showAddResource && <>
                            <div className="background-blur"/>
                            <div className="resource-popup">
                                <form onSubmit={handleAddResource}>
                                    <label>
                                        Title:
                                        <input type="text" value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
                                    </label>
                                    <label>
                                        Type:
                                        <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
                                            <option value="video">Video</option>
                                            <option value="problem">Problem</option>
                                        </select>
                                    </label>
                                    <label>
                                        Link:
                                        <input type="text" value={resourceLink} onChange={(e) => setResourceLink(e.target.value)} />
                                    </label>
                                    <div>
                                        <button type="submit" style={{marginRight: "1rem"}}>Add</button>
                                        <button onClick={() => {setShowAddResource(false)}}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </>}
                    </>}
                </div>
            </div>
            
            {(isTeacher && concept["feedback"].length>0) &&<div className="section">
                <div className="section-text">Feedback</div>
                <div className="feedback-section">
                    <UnderstandingGraph feedback={concept["feedback"]} userClass={userClass}/>
                </div>
            </div>}
        </div>
    </div>
}

export default ConceptPage;
