import { Box, Button, Spacer, Flex } from "@chakra-ui/react";
import Calendar from "./Calendar";
import List from "./List";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
    const navigate = useNavigate();
    const [displayedView, setDisplayedView] = useState<any>(<Calendar/>)


    return(<Box maxWidth='80vw' marginX='auto' borderWidth='2px' width='fit-content'>
        <Flex padding={2} columnGap='4px'>
            <Button onClick={() => setDisplayedView(<Calendar/>)}>Calendar</Button>
            <Button onClick={() => setDisplayedView(<List/>)}>List</Button>
        </Flex>
        
        {displayedView}
    </Box>
            
    )
}