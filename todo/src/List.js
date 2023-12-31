import { useState } from "react";
import ListElement from "./ListElement";

const List = ({todoTasks, setTodoTasks}) => {
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [includeCompleted, setIncludeCompleted] = useState();

    let todoItems = todoTasks.map((todo, index) => {
        if (!todo.isCompleted && !includeCompleted){
            return(
                <ListElement index={index} todoTasks={todoTasks} setTodoTasks={setTodoTasks} key={index} />
            )
        } else if (includeCompleted) {
            return(
                <ListElement index={index} todoTasks={todoTasks} setTodoTasks={setTodoTasks} key={index} />
            )
        }
        return <p>Kunne ikke finne liste</p>
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        setTodoTasks([...todoTasks, {"name": Name, "description": Description, "isCompleted": false, "id": todoTasks.length}])
        setName("")
        setDescription("")
        console.log(todoTasks)
    }

    return(
        <>
            <div className="todolist">
                {todoItems}
            </div>
            <div className="maketask">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Navn" value={Name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Beskrivelse" value={Description} onChange={e => setDescription(e.target.value)} />
                    <input type="submit" />
                </form>
                <label>Vis ferdige oppgaver<input type="checkbox" onClick={e => setIncludeCompleted(e.target.checked)} /></label>
            </div>
        </>
    )
}
export default List;