import { useState , useEffect } from "react";
import loginAccountapi from "./api/loginAccount";
import { useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import "./Login.css"

const Login = () => {

    const navigate = useNavigate();

    const [ inputtext , setInputtext ] = useState("");
    const [ error , setError ] = useState(false)

    useEffect(() => {
        document.title = 'TodoLogin'
    },[])

    const loginClick = () => {
        loginAccountapi.getALL().then(accounts => {
            if(accounts.filter(account => inputtext == account.accountname).length !== 0){
				navigate('/');
                sessionStorage.setItem(
                    "accountid" , 
                    accounts.filter(account => inputtext == account.accountname).map(account => account.id)
                    );
            }else{
                setError(true);
            }
        })
    }

    return(
        <div className="login">
            <VStack>
                <div>
                    ID : <input p={3} type="text" name="name" className="inputaccount" value={inputtext} onChange={(e) => {setInputtext(e.target.value)}} />
                </div>
                <div className="loginbutton">
                    <button className="border_btn01" onClick={loginClick}>Login</button>
                </div>
                {error && <p>アカウントが見つかりません</p>}
            </VStack>
        </div>
    )
}

export default Login;