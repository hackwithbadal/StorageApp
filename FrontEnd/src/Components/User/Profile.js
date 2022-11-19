import React from 'react';
import { Image, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import Navbar from '../layout/Navbar'

function Profile() {
  const ProfileData = useSelector((state) => state.userdata.value);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
          <Image
            radius="md"
            src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            alt="Profile pic"
          />
        </div>
        {
          console.log(ProfileData.UserInfo.name)
        }
        <div>
          <div>Name:<Text weight={700}>{ProfileData.UserInfo.name}</Text></div>
          <div>Email:<Text weight={700}>{ProfileData.UserInfo.email}</Text></div>
          <div>Address:<Text weight={700}>{ProfileData.UserInfo.addr}</Text></div>
          <div>Number:<Text weight={700}>{ProfileData.UserInfo.number}</Text></div>
          <div>Join Us On:<Text weight={700}>{ProfileData.UserInfo.date}</Text></div>
        </div>
      </div>
    </>
  )
}

export default Profile;