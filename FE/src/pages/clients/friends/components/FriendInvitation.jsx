import React from 'react';
import ItemUser from './ItemUser';

const user = [
  {
    avatar:
      'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/500077002_1243677207146327_2607815726132631415_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeF58LK2r5RBdqxsjA-D_kj9a5OEL2p2AIJrk4QvanYAgnEQnxL2AB0he6Uvxz8iY_6Si0w2lq_b3rUg7iDWf0yf&_nc_ohc=bA7k9HJzoVMQ7kNvwHlZ_BT&_nc_oc=AdnAarxYiLxusR7FsANClsCn4xGLl2aRzWKzdGE1GDlkbl22IYK2s7kK63RVgzNV7Pw&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=mZRjfMsYSxNdetWJjHr_ZQ&oh=00_AfIFVyI2OpnckP3_5kpTyGOOkgEdyOYsHETS1wkEYYvYtQ&oe=6839BA58',
    name: 'Yến Nhi',
    id: '1',
  },
  {
    avatar:
      'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/484759203_657547609987220_37642020167177963_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEChJXV50HzgTok3QvalaOys_0sw----Syz_SzD7775LKNTZ-QvMiqCmbsAxlIXQMKqAMpB9y8hPrGqntldX9qD&_nc_ohc=xQQTgVn15LEQ7kNvwESMmkw&_nc_oc=AdkNv54QYkHTEhYqZhuetwGM-kdwMUh3H3ahHE4KQfvp8OFxQyOaEFNXerDuLnXF2Kg&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=veG7oq1b2eJ0_Y7hUWoyFg&oh=00_AfLoJzWTXSxj0qGJaC4LmONXLlDw6JL0WAaS0zvu2lpycA&oe=6839BAAD',
    name: 'Phuong Anh',
    id: '2',
  },
  {
    avatar:
      'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/500034789_1340541117051164_3131047576449665567_n.jpg?stp=cp6_dst-jpg_s160x160_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEffIFDMM5IuLRQegTQG1QwScEJoSvYZgVJwQmhK9hmBdcixpk8rxNbqG04xwAtoNhPn9AtqIiLZqiFfAGcmtAD&_nc_ohc=vlQN2D2Y19YQ7kNvwGwW7hc&_nc_oc=AdmB09iiohyjBS-gzNIZPOwzMDKZXLgGXzt9iV0ahzUY6ZhGTrxdZXky5fXHSP3GIZk&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=T8X0zNGp2oVk3pk6-G-wrw&oh=00_AfIunKKC7a21npQBVOPLr0AEYUM8RIrlI4M7_Ce4UW_G4A&oe=6839B7A3',
    name: 'Minh Thu',
    id: '3',
  },
];

const FriendInvitation = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
          fontSize: '18px',
          fontWeight: '500',
        }}
      >
        <span>Danh sách lời mời kết bạn</span>
        <a href="/friends/requests" style={{ textDecoration: 'none', color: '#1677ff' }}>
          Xem tất cả
        </a>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {user.map((item) => (
          <ItemUser key={item.id} user={item} friendStatus={true} />
        ))}
      </div>
    </div>
  );
};

export default FriendInvitation;
