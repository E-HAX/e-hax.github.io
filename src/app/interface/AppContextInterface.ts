import { Dispatch, SetStateAction } from "react";
import TabData from "./TabData";

export interface MemberData {
    id: number;
    name: string;
    username: string;
    about: string;
    ascii_art: string;
    position: string;
    linkedin: string;
    instagram: string;
    website: string;
    github: string;
    discord: string;
}
export interface SiteData {
    members: MemberData[]
}
// interface BlogData {}
// interface EventData {}

export default interface AppContextInterface {
    tabs: TabData[],
    setTabs: Dispatch<SetStateAction<TabData[]>>,
    data: SiteData,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
}