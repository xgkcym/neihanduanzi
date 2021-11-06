export enum GerderType {
  male = '0',
  female = '1'
}
export enum RoleType{
  admin = '0',
  normal = '1',
  limit = '2'
}
export type UserType = {
  uid?: string ,
  nickname?: string,
  telphone?: string,
  password?:string
  avatar?: string
  gender?: GerderType,
  city?: string,
  birthday?: string,
  education?:string,
  // 星座
  constellation?: string,
  // 个性
  individuality?: string
  role?:RoleType
  usable?:boolean
}