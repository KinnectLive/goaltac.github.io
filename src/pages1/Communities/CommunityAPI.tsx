import { Avatar, Box, Flex, Heading, Stack, Text, Image, useColorModeValue, Button, Progress, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { VerticalTimeline } from 'react-vertical-timeline-component';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { FaChartBar, FaCheck, FaSearch, FaShoppingBag, FaStar, FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { supabase } from './../../supabase';
import { ChatIcon } from '@chakra-ui/icons';
import { uniqueId } from 'lodash';
import { RandomUUIDOptions } from 'crypto';

export function getPicture(community: any) {
    return community.pic ? community.pic : './../GoalTac_TLogo.png'
}

export async function getCommunityByName(name: any)  {

    const { data: communityData, error } = await supabase
        .from('communities')
        .select('*')
        .eq('name', name)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return communityData;
}

/**
 * Grab joined communities from a user
 * @param userID uuid
 * @returns all joined communities
 */
export async function getJoinedCommunities(userID: any)  {

    const { data: communityData, error } = await supabase
        .from('profiles')
        .select('joinedCommunities')
        .eq('userid', userID).single();

    if (error) {
        console.error(error);
        return;
    }
    if (communityData.joinedCommunities == null) {
        return null
    }

    const communities = await getCommunityByID(communityData.joinedCommunities)
    return communities;
}

export async function getCommunityByID(communityID: any)  {
    const { data: communityData, error } = await supabase
        .from('communities')
        .select()
        .in('communityid', communityID);
    if (error) {
        console.error(error);
        return;
    }

    return communityData;
}

/**
 * Grab requested communities from a user
 * @param userID uuid
 * @returns all requested communities
 */
export async function getRequestedCommunities(userID: any)  {

    const { data: communityData, error } = await supabase
        .from('profiles')
        .select('reqCommunities')
        .eq('userid', userID).single();

    if (error) {
        console.error(error);
        return;
    }
    if (communityData.reqCommunities == null) {
        return null
    }

    const communities = await getCommunityByID(communityData.reqCommunities)
    return communities;
}

export async function getUserCommunities(user: any) {

}

export async function getAllCommunityNames() {
    const { data: communityData, error } = await supabase
        .from('communities')
        .select('name');

    if (error) {
        console.error(error);
        return;
    }

    return communityData;
}

export async function getAllCommunities() {
    const { data: communityData, error } = await supabase
        .from('communities')
        .select('*');

    if (error) {
        console.error(error);
        return;
    }

    return communityData;
}

export function insertCommunity(community: Community) : void {
    
}


export async function updateCommunity(community: any) : Promise<void> {
    const { error } = await supabase
        .from('communities')
        .update({ community })
        .eq('communityID', community.communityID)
        

    if (error) {
        console.error(error);
        return;
    }
}

/**
 * 
 * @param community 
 * @param member 
 * @returns 
 */
export async function upSertMember({communityID, member}: any) {
    const { error } = await supabase
        .from('communities')
        .upsert([ member ])
        .eq('communityID', communityID)
        .select()
        

    if (error) {
        console.error(error);
        return;
    }
}

export async function leaveCommunity(communityID: any, userID: any) {
    console.log("CommunityID: "+communityID, "UserID: "+userID)

}

export async function joinCommunity(communityID: any, userID: any) {
    console.log("CommunityID: "+communityID, "UserID: "+userID)
}


export interface Member {
    uuid: string,
    communityPoints: Number
}

export interface Community {
    name: string
    pic: string
    tags: [string]
    description: string
    score: number
    owner: string //uuid
    members: [Member]
    tasks: [string] //replace with call to the task interface
    communityID: string //uuid
}