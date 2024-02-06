import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TodoListContext } from "./context/TodoListContext";
import AddList from "./components/AddList";
import TodoList from "./components/TodoList";
import DeleteTodo from "./components/DeleteTodo";
import Timer from "./components/time";
import UserName from "./components/UserName";
import AddName from "./components/AddName";
import "./api/todo";
import { ChakraProvider ,Heading,StackDivider, VStack , Container , Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ModalPortal = ({ children , inputtext }) => {
    const target = document.querySelector(".containerend");
    return createPortal(children, target);
}

const Example = () => {
    const [userid , setUserid] = useState('1')
    const [modalOpen , setModalOpen] = useState(false);

    useEffect(() => {
        document.title = 'TodoList'
    },[])

    const navigate = useNavigate();
    const logoutClick = () => {
        navigate('/logout');
    }

    return(
        <ChakraProvider>
            <Container py="3" maxW="container.sm">
            <VStack
            divider={<StackDivider borderColor={'gray.200'} p={1} />}>
                <Heading as='h2' size='3xl' color='green'>ToDo List</Heading>
                <div>
                    <TodoListContext userid={userid}>
                        <div className="containerend"></div>
                        <Timer />
                        <AddList userid={userid} />
                        <TodoList userid={userid} />
                        <DeleteTodo />
                        <UserName setUserid={setUserid} userid={userid} handleOpenClick={() => setModalOpen(true)} />
                        {modalOpen && (
                            <ModalPortal>
                                <AddName handleCloseClick={() => setModalOpen(false)} setUserid={setUserid}/>
                            </ModalPortal>
                        )}
                    </TodoListContext>
                    <Button onClick={logoutClick} size='xs' style={{ textAlign : 'center' }}>Logout</Button>
                </div>
            </VStack>
            </Container>
        </ChakraProvider>
    )
}

export default Example;