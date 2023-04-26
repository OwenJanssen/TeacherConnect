import React, { useState } from 'react';
import Title from './Title';
import StudentLink from './StudentLink';

const FormHelpGroups = ({  }) => {
    const [groupByLesson, setGroupByLesson] = useState(true);
    const today = new Date();
    const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000); // 14 days ago

    const timePeriod = `Time Period: ${twoWeeksAgo.toLocaleDateString()} - ${today.toLocaleDateString()}`;

    const handleGroupByLesson = () => {
        setGroupByLesson(true);
    };

    const handleGroupByConcept = () => {
        setGroupByLesson(false);
    };

    const groups = {
        "Concepts": [
            {
                "Name": "Converting units",
                "Students": [
                    "Avery Brown",
                    "William Butler",
                    "Chloe Davis",
                    "Lily Mitchell",
                    "Henry Ward",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Equivalent ratios",
                "Students": [
                    "Jacob Foster",
                    "Madison Griffin",
                    "Jameson Rodriguez",
                    "Sophia Ramirez",
                    "Ava Waston",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Units of ratios",
                "Students": [
                    "Benjamin Coleman",
                    "Isabella Kim",
                    "Emma Smith",
                    "Mia Turner",
                    "Lucas Wright",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "What is a ratio?",
                "Students": [
                    "Charlotte Bell",
                    "Ethan Green",
                    "Noah Lewis",
                    "Andrew Powell",
                    "Oliver Taylor",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
        ],
        "Lessons": [
            {
                "Name": "Ratio and Proportion",
                "Students": [
                    "Chloe Davis",
                    "Lily Mitchell",
                    "Jameson Rodriguez",
                    "Sophia Ramirez",
                    "Mia Turner",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Percent",
                "Students": [
                    "Avery Brown",
                    "William Butler",
                    "Isabella Kim",                    
                    "Madison Griffin",
                    "Andrew Powell",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Decimals",
                "Students": [
                    "Charlotte Bell",
                    "Jacob Foster",
                    "Emma Smith",
                    "Henry Ward",
                    "Lucas Wright",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
            {
                "Name": "Fractions",
                "Students": [
                    "Benjamin Coleman",
                    "Ethan Green",
                    "Noah Lewis",
                    "Oliver Taylor",
                    "Ava Waston",
                ],
                "Understandings": [
                    4,
                    3,
                    2,
                    3,
                    2
                ]
            },
        ],
    }

    return <div className="form-help-groups">
        <Title/>
        <div className="buttons">
            <button
                className={`group-by-lesson${groupByLesson ? ' active' : ''}`}
                onClick={handleGroupByLesson}
            >
                Group by Lesson Confusion
            </button>
            <button
                className={`group-by-concept${!groupByLesson ? ' active' : ''}`}
                onClick={handleGroupByConcept}
            >
                Group by Concept Confusion
            </button>
        </div>
        <div className="time-period">{timePeriod}</div>
        <div className="groups">
            {groups[groupByLesson ? "Lessons" : "Concepts"].map((group, index) => (
            <div key={index} className="group">
                <div className="group-title">{group["Name"]}</div>
                <div className="students">
                    {group["Students"].map(s => <StudentLink userClass="teacher" studentName={s}/>)}
                </div>
            </div>
            ))}
        </div>
    </div>;
};

export default FormHelpGroups;
