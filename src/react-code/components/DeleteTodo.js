import { ToDosReduer , Context } from "../context/TodoListContext";
import todoapi from "../api/todo";
import childTodoapi from "../api/childTodo";
import { Button, Center } from "@chakra-ui/react";

const DeleteTodo = () => {
    const dispatch = ToDosReduer();
    const todos = Context();

    const conpleteTask = () => {
        dispatch({type : "delete"})
        todos.filter((todo) => todo.check === true).map(async (todo) => {
            await todoapi.delete(todo);
            await childTodoapi.getALL().then(cTodos =>
                cTodos.filter(cTodo => cTodo.parentID == todo.id).map(
                cTodo => childTodoapi.delete(cTodo.id)
            ));
        });
    }

    const allselect = () => {
        dispatch({type : "allSelect"})
    }

    const allUnselect = () => {
        dispatch({type : "allUnselect"})
    }

    const checkCount = () => {
        const count = todos.filter((todo) => todo.check === true);
        return todos.length === count.length ? true : false
    }

    return(
        <Center>
            <Button onClick={conpleteTask} colorScheme='teal' variant='outline'>削除</Button>
            <Button onClick={checkCount() ? allUnselect : allselect} colorScheme='teal' variant='outline'>{checkCount() ? "全解除" : "全選択"}</Button>
        </Center>
    )
}

export default DeleteTodo;