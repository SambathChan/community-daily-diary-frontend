export interface IPost {
  _id?: string;
  title: string;
  body: string;
  vote?: number;
  createdAt?: Date;
}