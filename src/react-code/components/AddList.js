import { useState } from "react";
import { ToDosReduer } from "../context/TodoListContext";
import todoapi from "../api/todo";
import { HStack, Input, Button, Stack } from "@chakra-ui/react";

const AddList = ( {userid} ) => {
    const [textTodo , settextTodo] = useState("");
    const dispatch = ToDosReduer();
    const addTodo = (e) => {
        if (textTodo !== "" && userid !== '1'){
            const newTodo = {
                id : String(Math.floor(Math.random() * 1e6)),
                task : textTodo,
                check : false,
                userid : userid
            }
            
            todoapi.post(newTodo).then(newTodo => {
            dispatch({type : "add" , id : newTodo.id , task : newTodo.task , userid : userid});
            settextTodo("");
            })
        }
    };

    return(
        <HStack>
            <Input
                type="text"
                value={textTodo}
                key="input"
                onChange={(e) => settextTodo(e.target.value)}
                variant='outline'
                placeholder='Please enter a new task'
            />
            <Stack direction='row' spacing={4} align='center'>
            <Button onClick={addTodo} colorScheme='teal' variant='outline'>追加</Button>
            </Stack>
        </HStack>
    )
}

export default AddList;