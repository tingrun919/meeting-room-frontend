import request from '@/utils/request';

export interface InRecordExists {
  roomId: string;
  startTime: string;
  endTime: string;
}

export function exists(params: InRecordExists): Promise<{ exists: boolean }> {
  return request.post('/roomuserecords/exists', params);
}

export default {
  exists,

};
