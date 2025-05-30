import Feed from '@/pages/clients/home/feed/Feed';
import HeaderClient from '@/pages/clients/header/HeaderClient';
import CreateSocialMediaPost from '@/pages/clients/home/post/CreateSocialMediaPost';
import OneToOneChat from '@/pages/clients/chat/component/OneToOneChat';

const ClientLayout = () => {
  const currentUser = { id: 1, name: 'Alice' };
  const recipientUser = { id: 2, name: 'Bob' };
  const handleSendMessage = (message) => {
    console.log('Sent message:', message);
    // Gửi message lên server tại đây (WebSocket, REST, etc.)
  };
  return (
    <>
      <HeaderClient />
      <CreateSocialMediaPost />
      <Feed />
      {/* <OneToOneChat
        currentUser={currentUser}
        recipientUser={recipientUser}
        onSendMessage={handleSendMessage}
      /> */}
    </>
  );
};

export default ClientLayout;
