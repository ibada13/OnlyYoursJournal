import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import { toast } from "sonner";
import { handleApiError } from "../../lib/errHandlers";
interface ConfirmDeleteModalParams { 
  prompt: {
    key: string;
    prompt: string;
  },
    setShowDeleteModal: (show: boolean) => void,
  route: string,
  to:string ,
  toast_msg_key: string,
    
}
export default function ConfirmDeleteModal({ prompt ,toast_msg_key ,route ,to,setShowDeleteModal }: ConfirmDeleteModalParams) { 
      const [confirmTitle, setConfirmTitle] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const navigate = useNavigate()
    const { t}=useTranslation()
  const handleDelete = async() => {
    if (confirmTitle === prompt.prompt) {
        try {
            await api.delete(route)
            toast.success(t(toast_msg_key))
            navigate(to)
        }
        catch (err) {
                handleApiError(err , t)
        } finally { 

            setShowDeleteModal(false);
        }
      
    }
  };  
  const isMuted = confirmTitle !== prompt.prompt;


    return (

                <div className="fixed h-full inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-bg/40">
          <div className="bg-background p-6 rounded-lg shadow-xl w-[90%] max-w-md space-y-8 bg-bg">
            <h2 className="text-xl font-bold text-center text-accent">
              {t("journal.confirm_del")}
            </h2>
            <p className=" text-center text-lg ">
              {t(prompt.key, { prompt:prompt.prompt })}
            </p>
            <input
              type="text"
              placeholder={prompt.prompt}
              value={confirmTitle}
              onChange={(e) => {
                setConfirmTitle(e.target.value);
                setDeleteError("");
              }}
              className="w-full p-2 border rounded text-fg focus:border-accent outline-0"
            />
            {deleteError && (
              <p className="text-red-500 text-sm ">{deleteError}</p>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors duration-300 text-black cursor-pointer"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleDelete}
                disabled={ isMuted}
                className={clsx("px-4 py-2 rounded  transition-colors duration-300 text-white ",
                  {
                  "bg-red-600 hover:bg-red-400 cursor-pointer": !isMuted, 
                    "text-muted bg-red-300 cursor-not-allowed":isMuted ,
                  })}
              >
                {t("trash")}
              </button>
            </div>
          </div>
        </div>
    )
}