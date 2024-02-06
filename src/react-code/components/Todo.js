import { useState , useEffect } from "react";
import { ToDosReduer } from "../context/TodoListContext";
import { Text , HStack, Input } from "@chakra-ui/react";
import childTodoapi from "../api/childTodo"
import todoapi from "../api/todo";

const ChildTodoSet = async (todos , setChildTodo) => {
    await setChildTodo(todos);
}

const Todo = ({ todo , userid }) => {

    const dispatch = ToDosReduer();

    const checkChange = (e) => {
        dispatch({ type : "checkChange" , id : e.target.value })
    }

    const editTodo = (e) => {
        const editingTodo = {
            id : todo.id,
            task : editText,
            check : false,
            userid : userid
        }
        todoapi.patch(editingTodo).then(() =>{
        dispatch({ type : "editTodo" , id : todo.id , task : editText});
        setTextEdit(false);
        });
    }

    const [ childopen , setChildopen ] = useState(false)
    const windControl = () => {
        setChildopen(!childopen)
    }

    const [ inputtext , setInputtext ] = useState("");
    const [ childTodo , setChildTodo] = useState([]);
    
    useEffect(() => {
        childTodoapi.getALL().then(todos => {
            const childtodo = todos.filter((cTodo) => cTodo.parentID == todo.id)
            ChildTodoSet(childtodo , setChildTodo)
        });
    }, [])

    const conpleteTask = (e) => {
        setChildTodo(childTodo.filter((todo) => todo.id !== e.target.value))
        childTodoapi.delete(e.target.value)
    }

    const addChildTodo = () => {
        if ( inputtext !== ""){
            const newTodo = {
                id : String(Math.floor(Math.random() * 1e6)),
                parentID : String(todo.id),
                task : inputtext,
                check : false
            }
            
            childTodoapi.post(newTodo).then(newTodo => {
                setChildTodo([...childTodo , newTodo])
            })
            setInputtext("");
        }
    }

    const [ editText , setEditText ] = useState(todo.task);
    const [ textEdit , setTextEdit ] = useState(false);
    const doubleclick = () => {
        setTextEdit(true);
    }

    return(
    <>
        <HStack>
            {textEdit ? (
                <input 
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ outline:'ridge 2px blue' }}
                onBlur={editTodo} />
            ) : (
                <Text 
                value={todo.id}
                fontSize='md' 
                onDoubleClick={doubleclick}>
                    {todo.task}
                </Text>
            )}
            <input type="checkbox" 
                value={todo.id} 
                checked={todo.check ? "checked" : ""} 
                onChange={checkChange}
            />
            <button value={todo.id} onClick={windControl}>{childopen ? "-" : "+" }</button>
        </HStack>
        {childopen &&
        <div>
            {childTodo.map(cTodo => {
                return(
                    <div key={cTodo.id}>
                        <HStack paddingLeft={3}>
                            <Text fontSize='sd'>{cTodo.task}</Text>
                            <button 
                            value={cTodo.id} 
                            style={{fontSize:'12px' , background:'#e4fdff'}} 
                            onClick={conpleteTask}>gj</button>
                        </HStack>
                    </div>
                )
            })}
            <Input 
                paddingLeft={3}
                size='sm' 
                variant='unstyled' 
                placeholder='New task' 
                type="text" 
                value={inputtext} 
                onChange={(e) => setInputtext(e.target.value)}
                onBlur={addChildTodo}
            />
        </div>
        }
    </>
    )
}

export default Todo;