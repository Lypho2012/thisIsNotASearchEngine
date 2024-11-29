import {createContext, Dispatch, SetStateAction} from "react";

const ScrapedContext = createContext<{data:{}[],setData:Dispatch<SetStateAction<{}[]>>}>({data: [], setData: () => {}})

export default ScrapedContext;
