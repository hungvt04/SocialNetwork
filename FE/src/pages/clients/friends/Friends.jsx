import React, { useEffect, useState } from 'react';
import ItemUser from './components/ItemUser';
import Loading from '../common/loading/Loading';
import { getFriendRequests, getSuggestedPeople } from '@/service/client/friends';

const Friends = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSuggest, setDataSuggest] = useState([]);
  const [dataRequest, setDataRequest] = useState([]);

  const fetchDataSuggestedPeople = async () => {
    setIsLoading(true);
    try {
      const response = await getSuggestedPeople({});
      const data = response?.data?.data || [];
      setDataSuggest(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataFriendRequests = async () => {
    setIsLoading(true);
    try {
      const response = await getFriendRequests({});
      const data = response?.data?.data || [];
      setDataRequest(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSuggestedPeople();

    fetchDataFriendRequests();
  }, []);

  return (
    <>
      {<Loading isLoading={isLoading} />}
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
          {dataRequest.map((item) => (
            <div key={item.id}>
              <ItemUser user={item} isSuggest={false} mutualFriendsCount="0" />
            </div>
          ))}
        </div>

        <hr style={{ margin: '30px 0px' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          <span>Những người bạn có thể biết</span>
          <a href="/friends/requests" style={{ textDecoration: 'none', color: '#1677ff' }}>
            Xem tất cả
          </a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {dataSuggest.map((item) => (
            <div key={item.id}>
              <ItemUser user={item} isSuggest={true} mutualFriendsCount="0" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Friends;
