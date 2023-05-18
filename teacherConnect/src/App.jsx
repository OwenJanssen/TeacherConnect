import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import TeacherPage from './components/TeacherPage';
import StudentPage from './components/StudentPage';
import ConceptPage from './components/ConceptPage';
import { data, setData } from './data';
import FormHelpGroups from './components/FormHelpGroups';
import LessonPage from './components/LessonPage';

function App() {
    const [stateData, setStateData] = useState(data);

    useEffect(()=>{
        setStateData(data);
    },[data]);

    if (!data) { return <h1>Data is loading...</h1>; }

    return <BrowserRouter>
        <div className="app-container">
            <Routes>
                <Route exact path="/" element={<Homepage/>} />
                <Route exact path="/teacher" element={<TeacherPage data={stateData} setData={setStateData}/>} />
                <Route exact path="/teacher/groups" element={<FormHelpGroups data={data}/>} />
                <Route exact path=":userClass/:studentName/landing-page" element={<StudentPage data={stateData}/>} />
                <Route exact path=":userClass/:studentName" element={<StudentPage data={stateData}/>} />
                <Route exact path=":userClass/concept/:conceptId/" element={<ConceptPage data={stateData} setData={setStateData}/>}/>
                <Route exact path=":userClass/lesson/:lessonId/" element={<LessonPage data={stateData} setData={setStateData}/>}/>
            </Routes>
        </div>
    </BrowserRouter>;
};

export default App;