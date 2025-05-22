import Feed from '@/pages/clients/feed/Feed';
import HeaderClient from '@/pages/clients/header/HeaderClient';
import CreateSocialMediaPost from '@/pages/clients/post/CreateSocialMediaPost';

const Client = () => {
  return (
    <>
      <HeaderClient />
      <CreateSocialMediaPost />
      <Feed />
    </>
  );
};

export default Client;
