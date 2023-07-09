import { Avatar, Box, Flex, Heading, Stack, Text, Image, useColorModeValue, Button, Progress, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { FaChartBar, FaCheck, FaSearch, FaShoppingBag, FaStar, FaUser } from 'react-icons/fa';

import { VerticalTimeline } from 'react-vertical-timeline-component';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useParams } from 'react-router-dom';

import { AutoResizeTextarea } from '../components/Calendar/AutoResizeTextArea';
import CheckAndTitle from '../components/CheckAndTitle';
import CommunityChat from '../components/Chats/CommunityChat';
// import Chat from '../components/Chats/PrivateChat';


export default function CommunityView() {

  // Variables ----------------------------------------------------------------------

  const { communityName } = useParams<{ communityName: string }>();

  const [isShortScreen, setIsShortScreen] = useState(false);

  // State variables to store the owner and members data
  const [owner, setOwner] = useState({ username: '', avatarurl: '' });
  const [members, setMembers] = useState([{ username: '', avatarurl: '' }]);
  const [communityUrl, setCommunityUrl] = useState('');

  // Buttons to View dropdowns
  const [viewMileStones, setViewMileStone] = useState(false)
  const [viewSubmitVerification, setSubmitVerification] = useState(false)

  // State variables to store the post data
  const [post, setPost] = useState({
    imageurl: '',
    title: '',
    description: '',
    userid: '',
    isPublic: '',
  });

  // useEffects ----------------------------------------------------------------------

  useEffect(() => {
    const handleResize = () => {
      setIsShortScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch the owner and members data from Supabase
    const fetchCommunityData = async () => {
      const { data: communityData, error } = await supabase
        .from('communities')
        .select('owner, members, pic')
        .eq('name', communityName?.toLowerCase())
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setOwner(communityData.owner);
      setMembers(communityData.members);
      setCommunityUrl(communityData.pic);

      // Store the owner and members data in state variables
      const { data: urlData, error: urlError } = await supabase
        .from('profiles')
        .select('username, avatarurl')
        .in('userid', communityData.members);

      if (urlError) {
        console.error(urlError);
        return;
      }

      const { data: urlData2, error: urlError2 } = await supabase
        .from('profiles')
        .select('username, avatarurl')
        .eq('userid', communityData.owner);

      if (urlError2) {
        console.error(urlError);
        return;
      }

      setOwner(urlData2[0] as unknown as { username: string, avatarurl: string });
      setMembers(urlData as unknown as { username: string, avatarurl: string }[]);

    };

    fetchCommunityData();
  }, []);


  // Functions ----------------------------------------------------------------------

  function handleViewMileStones() {
    setViewMileStone(!viewMileStones)
  }

  
  function handleViewSubmitVerification() {
    setSubmitVerification(!viewSubmitVerification)
  }

  function handlePostCreate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    console.log('Post created!');
  }

  return (
    <CheckAndTitle title={communityName + " | Community"}>

      <Stack direction={['column', 'row']} mt={"40px"}>
        <Box mb={5} ml={5} width={isShortScreen ? "90vw" : "310px"} p={2}>
          <Image src={communityUrl} boxSize={isShortScreen ? "90vw" : "300px"} />
          <Heading size="lg" mt={4}>{communityName}</Heading>

          {/* Admin */}
          <Stack direction="row" spacing={1} mt={2} p={2} width={isShortScreen ? "85vw" : "290px"} rounded="lg" bgColor={useColorModeValue('gray.50', 'gray.900')}>
            <Flex direction="column" alignItems="center">
              <Avatar src={owner.avatarurl} m="2" />
              <Text fontSize="xs" color="gray.500">
                {owner.username}
              </Text>
              <Text fontSize="xx-small" color="gray.500">
                Admin
              </Text>
            </Flex>

            {/* Members */}
            {members.map((member, index) => (
              <Flex key={index} direction="column" alignItems="center">
                <Avatar src={member.avatarurl} m="2" />
                <Text fontSize="xs" color="gray.500">
                  {member.username}
                </Text>
                <Text fontSize="xx-small" color="gray.500">
                  Member
                </Text>
              </Flex>
            ))}
          </Stack>

          <Button mt={2} width={"full"} onClick={handleViewSubmitVerification}>Submit Request</Button>
          <Button mt={2} width={"full"} onClick={handleViewMileStones}>View Milestones</Button>

          <Box display={viewMileStones ? 'block' : 'none'}>
            <VerticalTimeline>
              <VerticalTimelineElement
                // className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                date="Introduction"
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                icon={<FaCheck />}
              >
                <Heading>Ur mom</Heading>
                This is the tutorial<br />
              </VerticalTimelineElement>
              <VerticalTimelineElement
                // className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                date="Level 1"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<FaChartBar />}
              >
                <AutoResizeTextarea
                  value={'this is worth 1000pts which requires submission'}
                  fontWeight="semibold"
                  //cursor="inherit"
                  border="none"
                  pl={2}
                  m={1}
                  fontSize="10px"
                  overflow="hidden"
                  resize="none"
                  minH={10}
                  maxH={200}
                  focusBorderColor="none"
                  // color="gray.700"
                  bg={'red.100'}
                />
                <AutoResizeTextarea
                  value={'this is worth 10pts'}
                  fontWeight="semibold"
                  //cursor="inherit"
                  border="none"
                  pl={2}
                  m={1}
                  fontSize="10px"
                  overflow="hidden"
                  resize="none"
                  minH={10}
                  maxH={200}
                  focusBorderColor="none"
                  // color="gray.700"
                  bg={'orange.100'}
                />
                <AutoResizeTextarea
                  value={'this is worth 5pts'}
                  fontWeight="semibold"
                  //cursor="inherit"
                  border="none"
                  pl={2}
                  m={1}
                  fontSize="10px"
                  overflow="hidden"
                  resize="none"
                  minH={10}
                  maxH={200}
                  focusBorderColor="none"
                  // color="gray.700"
                  bg={'yellow.100'}
                />
                <AutoResizeTextarea
                  value={'this is worth 2pts'}
                  fontWeight="semibold"
                  //cursor="inherit"
                  border="none"
                  pl={2}
                  m={1}
                  fontSize="10px"
                  overflow="hidden"
                  resize="none"
                  minH={10}
                  maxH={200}
                  focusBorderColor="none"
                  // color="gray.700"
                  bg={'green.100'}
                />
              </VerticalTimelineElement>
              <VerticalTimelineElement
                // className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                date="level 2"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<FaStar />}
              >
                <Button width={'full'} bg={'gray.100'}>Submit Request</Button>
                this is where you fill out the form for red tasks<br />
              </VerticalTimelineElement>
              <VerticalTimelineElement
                // className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                date="level 3"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<FaShoppingBag />}
              >
                <p><b>69k</b> pts to get to Goaltac Plus/month <br /> <b>10$</b> = <b>100k</b> pts</p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                // className="vertical-timeline-element--education"
                contentStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                date="level 4"
                iconStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                icon={<ChatIcon />}
              >
                Click on this button to talk to the community chat for mentorship and help<br />
              </VerticalTimelineElement>
              <VerticalTimelineElement
                // className="vertical-timeline-element--education"
                contentStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                date="level 5"
                iconStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                icon={<FaUser />}
              >
                Change your profile picture and bio in settings<br />
              </VerticalTimelineElement>
              <VerticalTimelineElement
                // className="vertical-timeline-element--education"
                contentStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                date="level 6"
                iconStyle={{ background: 'rgb(250,250,250)', color: '#000' }}
                icon={<FaSearch />}
              >
                Search for communities<br />
              </VerticalTimelineElement>
            </VerticalTimeline>
          </Box>

          <Box display={viewSubmitVerification ? 'block' : 'none'}>
            <FormControl mb={4} mt={2} isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input type="text" value={post.imageurl}
                onChange={(event) => setPost({ ...post, imageurl: event.target.value })}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" value={post.title}
                onChange={(event) => setPost({ ...post, title: event.target.value })}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea value={post.description}
                onChange={(event) => setPost({ ...post, description: event.target.value })}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Make Public</FormLabel>
              <Input type="text" value={post.isPublic}
                onChange={(event) => setPost({ ...post, isPublic: event.target.value })}
              />
            </FormControl>
            <Button colorScheme="green" onClick={handlePostCreate}>
              Create
            </Button>
          </Box>
        </Box>

        <Box>
          <Image src='https://www.planetfitness.com/sites/default/files/styles/section_content_image_style/public/2017-11/PF%20logo.JPG?itok=haPexFqA' ></Image>
          <Text ml={2} mt={-7}>Community Ad</Text>
          <Box mt={4} ml={2} mr={2} p={4} bg={useColorModeValue('gray.200', 'gray.700')} rounded={'lg'}>
            <Heading size={'md'}>Community Wars (comming soon)</Heading>
            If the community gets a certain threshold of points, everyone gets points
            <br /><br />
            Theres a community task meter that fills up as people do tasks
            <Progress value={80} />
            <br />
            Rival Communities underneath a category system for our communities (Fitness, Coding, Dieting, Gaming)
            <br /><br />
            This is also where we keep community info for leadboards within the community
          </Box>
        </Box>

        <CommunityChat />
      </Stack>
    </CheckAndTitle>
  );
}