import { Dispatch, SetStateAction } from "react";
import CourseInfo from "./CourseInfo";
import { courseData } from "./Fetch";

function GetPopup({course, currentPopup}: {course : courseData[0] | undefined, currentPopup : string}): JSX.Element {

    console.log()

    switch (currentPopup){
        case "login":
            console.log("went to login")
            return <p>login</p>
        case "course":
            console.log("went to course")
            return <CourseInfo course={course}/>
        default:
            console.log("went to default")
            return <p>default</p>
    }
}

function Popup({course, setPopupActive, currentPopup}: {course? : courseData[0], setPopupActive : Dispatch<SetStateAction<boolean>>, currentPopup : string}): JSX.Element {
    return <>
            <div className="bg-black bg-opacity-70 w-full h-screen absolute flex justify-center items-center z-10 left-0 top-0">
                <div onClick={() => setPopupActive(false)} className="absolute right-4 top-4 flex justify-center items-center bg-white rounded-3xl p-1 cursor-pointer shadow-lg duration-200 hover:bg-neutral-300"><img src="../close.svg" className="h-12"></img></div>
                <div className="bg-white w-3/4 min-h-[75%] flex justify-center p-16 rounded-lg shadow-lg">
                    <GetPopup course={course} currentPopup={currentPopup}/>
                </div>
            </div>
        </>
}

export default Popup