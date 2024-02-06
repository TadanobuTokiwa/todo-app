import { createContext, useContext , useEffect, useReducer } from "react";
import todoapi from "../api/todo";

const TodoLists = createContext();
const TodoReducer = createContext();

// TodosオブジェクトとDBのTodoでcheckの値だけ異なる場合がある
// ※画面をリロードした際にチェックボックスの内容は引き継がない

const Todos = (todos, input) => {
    switch(input.type){
        case "init":
            const alltodo = [...input.todos];
            return alltodo.filter((todo) => todo.userid == input.userid)
        case "add":
            return [...todos , {id : input.id , task : input.task , check: false}];
            break;
        case "delete":
            return todos.filter((todo) => todo.check === false);
            break;
        case "allSelect":
            return todos.map((todo) => {
                return {id : todo.id , task : todo.task , check : true}
            });
            break;
        case "allUnselect":
            return todos.map((todo) => {
                return {id : todo.id , task : todo.task , check : false}
            });
            break;
        case "checkChange":
            return todos.map((todo) => {
                return(
                    todo.id == input.id ? {id : todo.id , task : todo.task , check : !todo.check} : { ...todo }
                )
            })
            break;
        case "editTodo":
            return todos.map((todo) => {
                return(
                    todo.id == input.id ? {id : todo.id , task : input.task , check : todo.check , userid : todo.userid}  : { ...todo }
                )
            })
            break;
        default:
            throw new Error('不明なアクションです。')
    }}

const TodoListContext = ({ children , userid }) => {

    const [ todos , dispatch ] = useReducer( Todos , [])

    useEffect(() => {
        todoapi.getALL().then(todos => {
            dispatch({ type : "init" , todos : todos , userid : userid});
        })
    }, [userid])

    return(
        <TodoLists.Provider value={todos}>
            <TodoReducer.Provider value={dispatch}>
                { children }
            </TodoReducer.Provider>
        </TodoLists.Provider>
    )
}

const Context = () => {
    return useContext(TodoLists);
}

const ToDosReduer = () => {
    return useContext(TodoReducer);
}

export {TodoListContext, Context, ToDosReduer};