import userapi from "../api/user";
import { HStack , Button, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const usernamesSet = async (users , setUserNames) => {
    await setUserNames(users);
}

const UserName = ({userid , setUserid , handleOpenClick}) => {

    const [userNames , setUserNames] = useState([]);
    const setAccountid = sessionStorage.getItem('accountid')

    useEffect(() => {
        userapi.getALL().then(users => {
            usernamesSet(users , setUserNames)
        });
    }, [userid])

    return(
        <HStack>
            <Select name="UserName" size="1" value={userid} onChange={(e) => setUserid(e.target.value)}>
                {userNames.filter((user) => user.accountid == setAccountid).map((user) => {
                    return(
                        <option key={user.userid} value={user.userid}>{user.username}</option>
                    )
                })}
            </Select>
            <Button onClick={handleOpenClick}>User追加</Button>
        </HStack>
    )
}

export default UserName;