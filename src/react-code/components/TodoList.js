import { Context } from "../context/TodoListContext";
import { VStack , StackDivider } from "@chakra-ui/react";
import Todo from "./Todo";

const TodoList = ( { userid }) => {
    const todos = Context();

    return(
        <VStack
            divider={<StackDivider />}
            width="100%"
            bgColor="white"
            borderColor="blackAlpha.100"
            borderWidth="1px"
            borderRadius="3px"
            p={5}
            alignItems="start"
        >
            {todos.map((todo) => {
                return(
                <div key={todo.id}>
                    <Todo todo={todo} userid={userid}/>
                </div>
                )
            })}
        </VStack>
    )
}

export default TodoList;