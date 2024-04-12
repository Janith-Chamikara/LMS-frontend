import  {useEffect, FC, ReactNode, useRef} from "react"
import { useSearchParams } from "react-router-dom"
type DialogProps = {
 title:string;
 onClose:()=>void;
 onOk:()=>void;
 children:ReactNode;
}
const Dialog:FC<DialogProps>=({title, onClose , onOk , children})=>{
 const [searchParams] = useSearchParams();
 const dialogRef = useRef<null | HTMLDialogElement>(null);
 const showDialog = searchParams?.get('showDialog');

 useEffect(()=>{
  if(showDialog === 'y'){
   dialogRef.current?.show()
  }else{
   dialogRef.current?.close()
  }
 },[showDialog])

 const closeDialog = () => {
  dialogRef.current?.close();
  onClose()
 }
 const clickOk =()=> {
  onOk();
  closeDialog()
 }

 const dialog:JSX.Element | null = showDialog === 'y' ? (<dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl tw-backdrop:bg-gray-800/50">
 <div className="tw-w-[500px] max-w-fullbg-gray-200 flex flex-col">
     <div className="flex flex-row justify-between mb-4 pt-2 px-5 tw-bg-yellow-400">
         <h1 className="text-2xl">{title}</h1>
         <button
             onClick={closeDialog}
             className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
         >x</button>
     </div>
     <div className="px-5 pb-6">
         {children}
         <div className="flex flex-row justify-end mt-2">
             <button
                 onClick={clickOk}
                 className="bg-green-500 py-1 px-2 rounded border-none"
             >
                 OK
             </button>
         </div>
     </div>
 </div>
</dialog>):null;


 
 
 return dialog;
}

export default Dialog;