import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddTask from '../components/Tasks/AddTask';
import TaskList from '../components/TaskList';
import supabase from '../supabase';
import NavBar from '../components/NavBar';

function HomePage({ session }) {
  //React Router DOM
  const navigate = useNavigate();
  const { state } = useLocation();
  //Supabase
  const [user, setUser] = useState(null); //sets user ID not user list

  useEffect(() => {
    if (session == null) {
      navigate('/login');
    } else {
      setUser(session.user.id);
    }
  }, [user]);
  return (
    <>
      <Box w='100%' h='100%'>
        <VStack p={4}>
          <AddTask userid={user} />
          <TaskList />
        </VStack>
      </Box>
      {/** 
      {whatAmIShowing()}
      {session === undefined ? (
        <>"No data :("</>
      ) : (
        <Box w="100%" h="100%">
          <VStack p={4}>
            <AddTask />
            <TaskList />
          </VStack>
        </Box>
      )}
      */}
    </>
  );
}

export default HomePage;
