import request from '@/utils/request';
import { CreateRoomUseRecord, RoomUseRecord } from '@/apis/RoomUseRecord';

export interface InRecordExists {
  roomId: string;
  startTime: string;
  endTime: string;
}

export function exists(params: InRecordExists): Promise<{ exists: boolean }> {
  return request.post('/roomuserecords/exists', params);
}

export function create(params: CreateRoomUseRecord): Promise<RoomUseRecord> {
  return request.post(`/meetingrooms/${params.meetingRoom}/userecords/`, params);
}

export default {
  exists,
  create
};
