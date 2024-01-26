import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react"

type value = {
 status:boolean;
 setStatus:Dispatch<SetStateAction<boolean>>
}

export const CourseStatus = createContext<value | null>(null)

const CourseStatusProvider:FC<{children:ReactNode}> = ({children}) => {
 const [status, setStatus ] = useState<boolean>(false);

 return <CourseStatus.Provider value={{status,setStatus}}>{children}</CourseStatus.Provider>
}

export default CourseStatusProvider