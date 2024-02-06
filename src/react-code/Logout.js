import { useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    sessionStorage.clear();

    const loginJump = () => {
        navigate('/login');
    }

    useEffect(() => {
        document.title = 'TodoLogout'
    },[])

    return(
        <VStack>
            <div>
                <h3>ログアウトしました。</h3>
            </div>
            <div>
                <button onClick={loginJump}>ログイン画面へ</button>
            </div>
        </VStack>
    )
}

export default Logout;