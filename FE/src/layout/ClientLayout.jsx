import Feed from '@/pages/clients/home/feed/Feed';
import HeaderClient from '@/pages/clients/header/HeaderClient';
import CreateSocialMediaPost from '@/pages/clients/home/post/CreateSocialMediaPost';

const ClientLayout = () => {
  return (
    <>
      <HeaderClient />
      <CreateSocialMediaPost />
      <Feed />
    </>
  );
};

export default ClientLayout;
