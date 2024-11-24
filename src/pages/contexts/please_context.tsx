import {createContext, Dispatch, SetStateAction} from "react";

const PleaseContext = createContext<{learned:boolean,setLearned:Dispatch<SetStateAction<boolean>>}>({learned: false, setLearned: () => {}})

export default PleaseContext;
