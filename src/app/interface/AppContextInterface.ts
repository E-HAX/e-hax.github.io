import { Dispatch, SetStateAction } from "react";
import TabData from "./TabData";

interface MemberData {
    id: number;
    name: string;
    username: string;
    about: string;
    link: string;
}

// interface BlogData {}
// interface EventData {}

export default interface AppContextInterface {
    tabs: TabData[],
    setTabs: Dispatch<SetStateAction<TabData[]>>,
    data: {
        members: MemberData[]
    },
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
}