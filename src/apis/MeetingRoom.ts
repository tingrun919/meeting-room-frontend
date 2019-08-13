import { RoomUseRecord } from './RoomUseRecord';

export interface MeetingRoom {
  /**
   * 会议室别名
   */
  alias: string;
  /**
   * ISO8601，创建时间
   */
  createdAt: string;
  /**
   * 当前正在进行的预约
   */
  currentReservation?: RoomUseRecord;
  /**
   * 会议室详细描述，保留字段，目前没有用……吧
   */
  description: string;
  /**
   * 会议室唯一标识
   */
  id: string;
  /**
   * 会议室图片的完整路径
   */
  imgPath?: string;
  /**
   * 会议室是否被删除
   */
  isDelete: boolean;
  /**
   * 会议室名称
   */
  name: string;
  /**
   * 下一个预约
   */
  nextReservation?: RoomUseRecord;
  /**
   * 会议室拥有的标签
   */
  tags?: string[];
  /**
   * ISO8601，最后修改时间
   */
  updatedAt: string;
  /**
   * 会议室使用状态
   */
  usingStatus: UsingStatus;
}

/**
 * 会议室使用状态
 */
export enum UsingStatus {
  Busying = "Busying",
  Idle = "Idle",
}
