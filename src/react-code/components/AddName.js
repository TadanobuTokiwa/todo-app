import { useState } from "react";
import userapi from "../api/user";
import { Button , Input} from "@chakra-ui/react";
import "./AddName.css"

const AddName = ({ handleCloseClick , setUserid}) =>{
    const [inputName , setInputName] = useState('');

    const setName = (e) => {
        setInputName(e.target.value);
    }

    const addDb = (e) =>{
        if (inputName !== ""){
            const userid = String(Math.floor(Math.random() * 1e5))
            const accountid = sessionStorage.getItem('accountid')
            const newName = {
                userid : userid,
                username : inputName,
                accountid : accountid
            }
            
            userapi.post(newName).then(() => {
                setUserid(userid);
                setInputName("");
                handleCloseClick();
            })
        }
    }

    return(
        <div className="modal">
            <div className="modal__content">
                <h2>User 追加</h2>
                <Input type="text" onChange={setName}/>
                <Button type="button" key="add" onClick={addDb}>追加</Button>
                <Button type="button" key="close" onClick={handleCloseClick}>閉じる</Button>
            </div>
        </div>
        /*
        <div>
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>User 追加</ModalHeader>
                <input type="text" onChange={setName} />
                <Button type="button" key="add" onClick={addDb}>追加</Button>
                <Button type="button" key="close" onClick={handleCloseClick}>閉じる</Button>
                </ModalContent>
            </Modal>
        </div>
        */
    )
}

export default AddName;