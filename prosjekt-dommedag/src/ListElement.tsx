import { Dispatch, SetStateAction } from "react"
import { courseData } from "./Fetch"

function ListElement({course, setActiveCourse, setPopupActive, setCurrentPopup}: {course : courseData[0], setActiveCourse : Dispatch<SetStateAction<courseData[0] | undefined>>, setPopupActive : Dispatch<SetStateAction<boolean>>, setCurrentPopup : Dispatch<React.SetStateAction<string>>}): JSX.Element {

    return (
        <div className="w-11/12 h-12 my-3 mx-2 bg-white flex flex-row justify-start border-neutral-500 border-solid border-2 rounded-md px-4 items-center">
            <h1 className="w-4/12 font-bold">{course.name}</h1>
            <p className="w-3/12">{course.day}</p>
            <p className="w-2/12">{course.time}</p>
            <button onClick={() => {setActiveCourse(course);setCurrentPopup("course");setPopupActive(true)}} className="w-3/12 h-5/6 bg-green-500 rounded-md cursor-pointer duration-200 hover:bg-green-600 shadow">Mer info</button>
        </div>
    )
}

export default ListElement