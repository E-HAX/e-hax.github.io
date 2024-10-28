"use client"
import { createContext, useEffect, useState } from "react";
import TabData from "../interface/TabData";
import AppContextInterface, { SiteData } from "../interface/AppContextInterface";


export const AppContext = createContext<AppContextInterface>({} as AppContextInterface);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [tabs, setTabs] = useState<TabData[]>([]);
    const [data, setData] = useState<SiteData>({} as SiteData);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller;
         
        function fetchData () {
            setLoading(true)
            setTimeout(async () => {
                try  {
                    const res = await fetch("/data.json", { signal });
                    const data = await res.json();
                    setData(data);
                } catch(err) {
                    setData({} as SiteData)
                    if ((err as Error).name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                    console.log(err);
                    }
                } finally {
                    setLoading(false)
                }
            }, 500)
        }

        fetchData()

        return () => controller.abort()
    }, [])
    
    return (
        <AppContext.Provider value={{ tabs, setTabs, data, loading, setLoading }}>
            {children}
        </AppContext.Provider>
    )
}