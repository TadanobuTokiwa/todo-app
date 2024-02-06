import { Heading, VStack } from "@chakra-ui/react";
import { useEffect , useState } from "react";

const Timer = () => {
    const [ time , setTime ] = useState(new Date())

    useEffect(() => {
        window.setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, [])

    return(
        <VStack>
            <Heading as='h2' size='xl' color='green.600'>
                {time.getHours().toString().padStart(2, '0') + " : " + time.getMinutes().toString().padStart(2, '0') + " : " + time.getSeconds().toString().padStart(2, '0')}
            </Heading>
        </VStack>
    )

}

export default Timer;