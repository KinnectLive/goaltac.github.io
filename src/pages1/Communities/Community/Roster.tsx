import {
    Box,
    Text,
    Flex,
    Heading,
    Spacer,
    Icon,
    HStack,
    Divider,
    useColorMode
} from '@chakra-ui/react'
import {
    GiArrowhead,
    GiPerson
  
  } from 'react-icons/gi'
import { formatNumber } from '../../../hooks/Utilities';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react';
import { getUser } from './../../../hooks/Utilities'
import { useState, useEffect } from 'react';
import { Member } from '../CommunityAPI';

//roster has different viewables based on permission level
/**
 * Displays the clan's roster
 * @param {*} param0
 */
export default function Roster({community}: any) : ReactElement {

    const orderedPeople = numericalOrder(community.members)

    return (<Box minHeight='100%' paddingTop='20px'>
        {orderedPeople}
    </Box>)
    
}

/**
 * Check what permission nodes the user viewing the clan
 * has. This is an integer value with 0 being the lowest.
 * Meaning they are not in the clan and do not have any other
 * permissions
 * 
 * @param {user} Supabase user session
 * @returns permission level
 */
function checkPermission(user: Object) {
    return 1;
}

/**
 * 
 * @param {*} param0 
 * @returns ordered list of every member
 */
function numericalOrder(people: any) {
    const orderedPeople = people.sort(
        (a: { communityPoints: number; }, b: { communityPoints: number; }) => 
        (a.communityPoints < b.communityPoints) ? 1 : -1)
    return orderedPeople.map((personObj: Member, index: any) => 
        <RowItem member={personObj} id={index} key ={index}/>)
}

/**
 * A row item contains the user's profile, name, personal
 * points, and other contributions made to the clan
 * @param {*} param0 
 * @returns Row display for roster
 */
function RowItem({member, id}: any) {
    
    const { colorMode } = useColorMode();

    //get username from uuid
    const [userName, setUserName] = useState<any>();
    useEffect(() => {
        const fetchUserName = () => getUser(member.uuid).then((response) => {
            setUserName(response?.name)
            console.log(member)
        })
        fetchUserName();
      }, []);

    return (
    <Flex
        height='60px' 
        marginY='5px'
        flexDirection='column'
        borderWidth='1px'
        borderRadius='15px'
        paddingX='1rem'>
        <HStack width='100%' justifyContent='center' marginY='auto'>
            <Heading fontSize='1.5rem' paddingEnd='1rem'>
                {id + 1}.
            </Heading>
            <Divider orientation='vertical' />
            <Text fontSize='1.5rem' paddingStart='0.5rem'>
                {userName ? userName : 'hi'}
            </Text>
            <Spacer/>
            <Flex borderColor='blue.200' 
                backgroundColor={colorMode == 'dark' ? 'blue.700' : 'blue.100'}
                borderRadius='10px' 
                width='120px'
                padding='4px' 
                columnGap='10px'
                justifyContent='right'
                borderWidth='2px'>
                <Text fontSize='1.25rem'>
                    {formatNumber(member.communityPoints)}
                </Text>
                <Icon boxSize='1.5rem' as={GiArrowhead}/>
            </Flex>

        </HStack>
    </Flex>);
}