import { useEffect, useState, useRef } from 'react';
import {
  Flex,
  Text,
  Button,
  Textarea,
  FormLabel,
  Card,
  FormControl,
  Avatar,
  CardBody,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { useSupabaseClient } from '../hooks/SessionProvider';

export default function Profile({ session }) {
  const { username } = useParams();
  const [editMode, setEditMode] = useState(false);
  const supabase = useSupabaseClient();


  const [profile, setProfile] = useState({
    id: null,
    username: '',
    biography: '',
  });

  useEffect(() => {
    async function getProfile() {
      console.log(username);
      const { data, error } = await supabase
        .from('profiles_view')
        .select('*')
        .eq('username', username)
        .limit(1)
        .single();

      setProfile({
        id: data.id,
        username: data.username,
        biography: data.biography,
      });
    }

    getProfile();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('profiles')
      .update({
        biography: profile.biography,
      })
      .eq('id', profile.id)
      .then(setEditMode(false));
  };

  const onChangeHandler = e =>
    setProfile(prevProfile => ({
      ...prevProfile,
      [e.target.name]: e.target.value,
    }));

  const onClickEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      justifyContent='center'
      alignItems='center'
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Button
        visibility={editMode ? 'hidden' : 'visible'}
        onClick={onClickEdit}
        bg={'blue.400'}
        color={'white'}
        w='full'
        _hover={{
          bg: 'blue.500',
        }}
        size='sm'
      >
        Edit Profile
      </Button>
      <Card>
        <CardBody>
          <Avatar
            name={profile.username}
            src='https://i.kym-cdn.com/photos/images/facebook/000/581/273/6aa.png'
          />
          <Text>{profile.username}</Text>
        </CardBody>
      </Card>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Biography</FormLabel>
          {editMode ? (
            <Textarea
              value={profile.biography}
              name='biography'
              onChange={onChangeHandler}
              placeholder='Write an interesting bio!'
              size='sm'
            />
          ) : (
            <Text>{profile.biography}</Text>
          )}
        </FormControl>
        <Button
          type='submit'
          bg={'blue.400'}
          color={'white'}
          w='full'
          _hover={{
            bg: 'blue.500',
          }}
          visibility={editMode ? 'visible' : 'hidden'}
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
}
