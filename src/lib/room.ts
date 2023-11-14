import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Room } from '../shared/chat.interface';
import { BASE_URL_API } from '../shared/url.constants';

export const useRoomQuery = (roomName: string, isConnected: boolean) => {
  const query = useQuery({
    queryKey: ['rooms', roomName],
    queryFn: (): Promise<Room> =>
      axios.get(`${BASE_URL_API}/api/rooms/${roomName}`).then((response) => response.data),
    refetchInterval: 60000,
    enabled: isConnected,
  });
  return query;
};

export const useRoomsQuery = () => {
  const query = useQuery({
    queryKey: ['select_rooms'],
    queryFn: (): Promise<Room[]> =>
      axios.get(`${BASE_URL_API}/api/rooms`).then((response) => response.data),
  });
  return query;
};

export const unsetRoom = () => {
  sessionStorage.removeItem('room');
};
