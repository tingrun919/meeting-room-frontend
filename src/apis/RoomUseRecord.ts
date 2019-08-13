// Generated by https://quicktype.io

export interface RoomUseRecord {
  /**
   * 对应的会议室Id
   */
  meetingRoom: string;
  /**
   * ISO8601，创建时间
   */
  createdAt: string;
  /**
   * 创建人
   */
  creator: string;
  /**
   * 预约详细描述
   */
  description: string;
  /**
   * ISO8601
   * 当status=NORMAL 时，预约结束时间；
   * 当status=FINISHED 时，进行完成操作的时间。
   */
  endTime: string;
  /**
   * 预约记录唯一标识
   */
  id: string;
  /**
   * 预约是否被删除
   */
  isDelete: boolean;
  /**
   * ISO8601
   * 当status=NORMAL 时，为null；
   * 当status=FINISHED 时，为原始预约结束时间。
   */
  rawEndTime: string;
  /**
   * 预约相对当前时间的状态
   */
  recordStatus: RecordStatus;
  /**
   * ISO8601，预约开始时间
   */
  startTime: string;
  /**
   * 预约的状态（如被手动完成等）
   */
  status: Status;
  /**
   * ISO8601，最后修改时间
   */
  updatedAt: string;
  /**
   * 预约是否使用了密码保护
   */
  useToken: string;
}

export interface CreateRoomUseRecord
  extends Pick<RoomUseRecord, 'meetingRoom' | 'startTime' | 'endTime' | 'creator'> {
    description?: string;
    /**
     * 预约的密码
     */
    token?: string;
}

/**
 * 预约相对当前时间的状态
 */
export enum RecordStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Closed = 'Closed',
}

/**
 * 预约的状态（如被手动完成等）
 */
export enum Status {
  Normal = 'NORMAL',
  Finished = 'FINISHED'
}
