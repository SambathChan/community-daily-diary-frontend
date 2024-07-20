export interface IPost {
  uuid?: string;
  title: string;
  body: string;
  vote?: number;
  createdAt?: Date;
}