import { Avatar, Button } from 'antd';
import React, { useState } from 'react';
import { EnvironmentOutlined, HeartOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import Article from './Article';

const styleAvatar = {
  marginLeft: '15px',
  flexShrink: 0,
  alignSelf: 'center',
  cursor: 'pointer',
  position: 'absolute',
  top: '355px',
  left: '40px',
  zIndex: 1,
  border: '3px solid white',
};

const styleDiv = {
  backgroundColor: 'rgb(255, 255, 255)',
  padding: '10px',
  borderRadius: '10px',
  marginBottom: '20px',
};

const data1 = [
  {
    articleId: '1',
    authorName: 'Hùng Vũ',
    createdAt: '10 giờ trước',
    content: 'AHSHH \n abc',
    urls: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/495094495_1129367859224212_5787356467234519629_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEklNP4QPCp7NCsAF8L1UzOYhopFS2krDhiGikVLaSsOA4Qc62ICA3MZ7Wy1QLJFmIFyTOqP7bn61846mZDb-Z9&_nc_ohc=oaxPcm4JVOQQ7kNvwG6k5IS&_nc_oc=Adm7oD7oe8MB4Gc_aArqtn_T6Mzsd-GAtv2pjwt5ukznDMU5qzcil84KXsky9bwCW6w&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=3FKWErTK8ZCAfjYwNO-r3A&oh=00_AfK1NWRLYsEoTmPJnRBEBMc46DnbFX_b5C8iDCAt95E3-g&oe=6839EA35',
    totalReact: 100,
    totalComment: 30,
    totalShare: 9,
  },
  {
    articleId: '2',
    authorName: 'Hùng Vũ',
    createdAt: '10 giờ trước',
    content:
      'Có ông anh hàng xóm LVH vừa bị bắt khởi tố đi tò không dùng đến pass lại giá rẻ cho anh em nào cần ib haha 😂',
    urls: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/496126557_1129367942557537_3090304004072291584_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGPxN9u0ppaIJyZ4oWkefOO6kaTOC9hiqnqRpM4L2GKqeUjLiYAh5-emiwTy7JZ_ENM_f9QSBMZtXTDFspp1zhR&_nc_ohc=ZtdANMj7yrAQ7kNvwFqesiP&_nc_oc=Adm8TXKAAWU2fjB0zmvDuXzpYXxMTLEKQ5Jn6yIkrx1Pd4V-99JvQ-PqsmHrP6gImtw&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=OtjY5KUN_FjOKbG6mEnhCA&oh=00_AfJJPWulls-83s6w1H2TwgezqiFVOkgzn-3E-h98hycIKg&oe=6839D002',
    totalReact: 100,
    totalComment: 30,
    totalShare: 9,
  },
  {
    articleId: '3',
    authorName: 'Hùng Vũ',
    createdAt: '10 giờ trước',
    content: '',
    urls: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/496927126_1129367932557538_7867445272587205418_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHi-PpG9AUQcAnUMKyDzBcVL2oP72OEWPYvag_vY4RY9nKbAWUYbzWbXPYA19cgWAb2dPhI-1LPncS2F0tSnpAC&_nc_ohc=D7tb1Djbsn8Q7kNvwEk2Cf9&_nc_oc=AdkBc_lUUAvIjFAUL407p6rPAGQHnZVcVWaqWUPLzemuBqZzrxRA-UhR-rULcNoDPhA&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=IQSE0x0htnlsu8kr-2CEzg&oh=00_AfIYIgwwQMj4vWnGyBQNUUcvQvt-4kmBZGisZMwcriroNA&oe=6839E449',
    totalReact: 100,
    totalComment: 30,
    totalShare: 9,
  },
];

const Profile = () => {
  const [data, setData] = useState(data1);
  return (
    <>
      <div
        style={{
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          margin: '0 350px',
        }}
      >
        <div
          style={{
            height: '440px',
            overflow: 'hidden',
            borderRadius: '5px',
          }}
        >
          <img
            src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/471200781_1780925629387161_5280503255027001025_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEuHnQTRoCDozMNh_WDxPiVyRgMVHpsgqjJGAxUemyCqEUqL0llL53lFncUi_KVJIFeaMg2oXkdWTK-XlXWac3D&_nc_ohc=g2JSskgTJbwQ7kNvwHsXwuH&_nc_oc=Adm1USmYRUL4_W_2HSlMuKjczceO0qGUSOa4iNnqzG9XcdjKLsK2UjiaxA_cB3QFDCg&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=3o4t0rGxRAke-V5hrEv2yQ&oh=00_AfK0pcAwOm1TQ0xEgw0MJoPK7D48TeEfd-yFbH-kTBooBg&oe=6839D574"
            style={{ width: '100%', borderRadius: '5px' }}
          />
        </div>
        <Avatar
          size={160}
          src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/475770652_1812313242915066_9029938602143909963_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeF4Hln69NjmS13_GJtjWlmjUcAB4YiqHP1RwAHhiKoc_SYgiqjQMerB7ejL77csaZOSerPZG4aMxssnezelRtaZ&_nc_ohc=EufH5FrCl3oQ7kNvwHPtElo&_nc_oc=AdmL_oaWlR4DFQHYJY3gLQk0XmjroIePtUrRoYUlGTRSGh9zfMOgNqTvdfRg4DK5Uu8&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=3o4t0rGxRAke-V5hrEv2yQ&oh=00_AfKACD3renRDtiYEZHmqLEr_IOXJF_r7w6SY8_isM7Kb8Q&oe=6839A441"
          style={styleAvatar}
        />

        <span
          style={{
            position: 'absolute',
            top: '450px',
            left: '230px',
            fontSize: '26px',
            fontWeight: '600',
          }}
        >
          Phương Thảo
        </span>
        <span
          style={{
            position: 'absolute',
            top: '485px',
            left: '230px',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          200 người bạn
        </span>
        <div style={{ display: 'flex', justifyContent: 'end', margin: '20px' }}>
          <Button
            style={{
              marginRight: '10px',
              color: 'rgb(255, 255, 255)',
              backgroundColor: 'rgb(8, 102, 255)',
            }}
          >
            Thêm bạn bè
          </Button>
          <Button>Nhắn tin</Button>
        </div>
      </div>
      <hr style={{ margin: '20px 350px' }} />

      <div
        style={{
          backgroundColor: '#F0F2F5',
          padding: '20px',
          borderRadius: '5px',
          minHeight: '100px',
          margin: '0 350px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '40%', position: 'relative' }}>
          <div
            style={{
              ...styleDiv,
              width: '100%',
            }}
          >
            <p style={{ fontSize: '20px', fontWeight: '600', margin: '0' }}> Giới thiệu </p>
            <p style={{ margin: '0', textAlign: 'center' }}> Sinh ngày 20/10/2000 </p>
            <hr style={{ margin: '20px 0' }} />
            <p>
              <HomeOutlined /> Sống tại Hà Nội
            </p>
            <p>
              <EnvironmentOutlined /> Đến từ Bắc Kạn
            </p>
            <p>
              <HeartOutlined /> Độc thân
            </p>
          </div>
        </div>

        <div
          style={{
            width: 'calc(60% - 20px)',
            borderRadius: '10px',
          }}
        >
          <div
            style={{
              ...styleDiv,
            }}
          >
            <p style={{ fontSize: '20px', fontWeight: '600', margin: '0' }}> Bài viết </p>
          </div>

          {data &&
            data.length > 0 &&
            data.map((item) => (
              <div style={{ ...styleDiv, padding: '7px 18px 0 18px' }} key={item.articleId}>
                <Article
                  key={item.articleId}
                  articleId={item.articleId}
                  authorName={item.authorName}
                  createdAt={item.createdAt}
                  content={item.content}
                  urls={item?.urls?.split(/\s*,\s*/) || []}
                  totalReact={item.totalReact}
                  totalComment={item.totalComment}
                  totalShare={item.totalShare}
                  react={item.react}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
