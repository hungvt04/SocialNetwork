import React from 'react';
import HeaderClient from '../common/header/HeaderClient';
import SocialMediaPost from '../common/post/SocialMediaPost';
import CreateSocialMediaPost from '../common/post/CreateSocialMediaPost';

const Dashboard = () => {
  return (
    <>
      <HeaderClient />
      <CreateSocialMediaPost />
      <SocialMediaPost />
    </>
  );
};

export default Dashboard;
