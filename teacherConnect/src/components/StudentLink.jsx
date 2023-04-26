import { useNavigate } from "react-router-dom"

export const StudentLink = ({ userClass, studentName }) => {
    const nav = useNavigate();

    const goToStudent = () => {
        nav(`/${userClass}/${studentName.toLowerCase().replace(/ /g, "-")}`);
    }

    return <div className="student-link" onClick={goToStudent} key={studentName}>
        {studentName}
    </div>;
}

export default StudentLink;