import { MemberData } from "./AppContextInterface";

export default interface TabData {
  id: number;
  title: string;
  content?: React.ReactNode;
  member?: MemberData
}
