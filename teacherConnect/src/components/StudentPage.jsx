import React, {useState, useEffect} from 'react';
import Title from './Title';
import { useNavigate, useParams } from 'react-router-dom';
import { routeInfo } from '../data';
import { SaveHistory } from '../helper';

function convertName(name) {
    // Split the name into an array of separate words
    const words = name.split('-');
    
    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Join the capitalized words back together with a space between them
    const result = capitalizedWords.join(' ');
    
    return result;
}

const UnderstandingGraph = ({ concepts, name, userClass }) => {
    const nav = useNavigate();
    const [selected, setSelected] = useState(4);
    const understandingLevels = Array.from({ length: 5 }, (_, i) => i + 1);
    const understandingCounts = understandingLevels.map(level =>
        concepts.filter(concept => 
            concept.feedback.filter(f => f.name==name)[0].understanding === level).length
    );
    
    const handleClick = (index) => {
      setSelected(index);
    };

    const goToConcept = (c) => {
        SaveHistory(nav,`/${userClass}/concept/${c}`);
    };
    
    return <div className="graph-container" style={{marginTop: "2rem"}}>
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
                {concepts.filter(concept => 
                    concept.feedback.filter(f => f.name==name)[0].understanding === understandingLevels[selected])
                        .map((concept, index) => (
                            <div key={index} className="concept-link" onClick={()=>goToConcept(index)}>
                                {concept.date}: {concept.title}
                            </div>
                        )
                    )
                }
            </div>
        )}
    </div>
};

function StudentPage({ data }) {
    const { userClass, studentName } = useParams();
    const name = convertName(studentName);

    useEffect(()=>{
        routeInfo.setCurrentRoute({route:`/${userClass}/${studentName}`,name:`${name}'s Home`})
    },[]);

    const goToLatestLesson = () => {
        SaveHistory(nav,`/student/lesson/0`);
    };

    return <div className="student-page">
        <Title/>
        <div className="student-name">{name}</div>
        {userClass == "student" && 
            <div className="view-latest-lesson-button" onClick={goToLatestLesson}>View Latest Lesson</div>
        }
        <UnderstandingGraph concepts={data.Concepts} name={name} userClass={userClass}/>
    </div>
}

export default StudentPage;
