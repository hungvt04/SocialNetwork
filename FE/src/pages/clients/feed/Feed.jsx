import Article from './Article';
import axiosInstance from '../../../api/axiosInstance';
import { API_MANAGEMENT_ARTICLE } from '../../../constants/BaseApi';
import Loading from '../common/loading/Loading';
import { useEffect, useState } from 'react';

const data1 = [
  {
    articleId: '1',
    authorName: 'Hùng Vũ',
    createdAt: '10 giờ trước',
    content: 'AHSHH \n abc',
    urls: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/494677317_4252578891637332_6129396017700470582_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFrXpBo6b6oCjM4NrjTiCSgEo4gMxzsUfISjiAzHOxR8tOR2CiEdsIa29C00OD28Ir4CUg2MjENaDPHy32-Ii1p&_nc_ohc=J8qYKZT9PJ0Q7kNvwHOubAZ&_nc_oc=Adm6v9g_MOthzvck2ZxjpQga9oH-65paLBlBk42ZWzEL6JQ1pzkB-4xDVQSt5HtLm9c&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=QFukD_IgP28mLYACPoPPFg&oh=00_AfL49uRLrBQUFQUKihWtzBLwNuyEfndKjjNcInOGV1xbxw&oe=68275AC7',
    totalReact: 100,
    totalComment: 30,
    totalShare: 9,
    react: 'like',
  },
  {
    articleId: '2',
    authorName: 'Hùng Vũ',
    createdAt: '10 giờ trước',
    content:
      'Có ông anh hàng xóm LVH vừa bị bắt khởi tố đi tò không dùng đến pass lại giá rẻ cho anh em nào cần ib haha 😂',
    urls: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/495582672_1367525971224774_4682738249388531574_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=_MzvvzTkTZ0Q7kNvwE3Ml6w&_nc_oc=Adn9-wDICAMx-x8I8-wR6fmTrV85vKKJqNzr0XwfRvZ_CcF-moDf0vFLx12P964xSYc&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=SC3kwLh3vA8s12-oUipY6w&oh=00_AfKHT5xzpCa_JQO22Qfjdih8E9bTkY3x4lVy7lhdO0BEoQ&oe=6824D948',
    totalReact: 100,
    totalComment: 30,
    totalShare: 9,
  },
  {
    articleId: '3',
    authorName: 'Hùng Vũ',
    createdAt: '10 giờ trước',
    content: '',
    urls: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/495568998_1020112773548685_1129295119698724901_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hSJUonJ3IWMQ7kNvwEp2IFX&_nc_oc=Adl8yBCh8EQDL0VonDGcxOv5U2wQx7LRRXtLrGpjFQmJTOqMWeC0lcawTF_BqQSXsi0&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=ZjLSMoJtD-iDATh4x9zJ6A&oh=00_AfJjiNtPlxenokxbvI9-1RwZVAAxXMEo6u8W3_IrAq-u8Q&oe=6824DD03',
    totalReact: 100,
    totalComment: 30,
    totalShare: 9,
  },
];

const Feed = () => {
  const [data, setData] = useState(data1);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_MANAGEMENT_ARTICLE);

      setData([
        ...data,
        ...response?.data.map((item) => ({
          ...item,
          totalReact: 100,
          totalComment: 30,
          totalShare: 9,
        })),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {<Loading isLoading={isLoading} />}
      {data &&
        data.length > 0 &&
        data.map((item) => (
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
        ))}
    </>
  );
};

export default Feed;
