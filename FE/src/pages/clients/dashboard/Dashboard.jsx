import HeaderClient from '../header/HeaderClient';
import CreateSocialMediaPost from '../post/CreateSocialMediaPost';
import Feed from '../feed/Feed';

const Dashboard = () => {
  return (
    <>
      <HeaderClient />
      <CreateSocialMediaPost />
      {/* <SocialMediaPost /> */}
      <Feed />
    </>
  );
};

export default Dashboard;
