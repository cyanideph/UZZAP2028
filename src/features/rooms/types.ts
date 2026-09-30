export type RoomId=string;

export interface RoomMessagePage{
  items:unknown[];
  nextCursor?:{beforeCreatedAt:string;beforeId:string}|null;
}
