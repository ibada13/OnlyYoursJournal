import { useState } from "react";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import { useTranslation } from "react-i18next";
export default function ActionsPage() {
  const { t} = useTranslation()

    const [confirmDelete, SetConfirmDelete] = useState<{deleteJournals :boolean , deleteAccount:boolean  }>({deleteAccount :false , deleteJournals:false})


  return (
    <div className="min-h-screen flex-1 bg-secondary rounded-lg shadow-xl flex justify-center items-start py-16">
      <div className="w-[90%] max-w-2xl p-8 text-fg space-y-6">

        <div className="space-y-4 rounded-xl p-6 ">
          <h2 className="text-2xl font-semibold text-red-600">{t("actions.delete_all_journals_title")}</h2>
          <p className="text-sm font-semibold text-red-500">
            { t("actions.delete_all_journals_description")}
          </p>
          <button
            onClick={()=>SetConfirmDelete((e)=>({...e ,deleteJournals:true}))}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition cursor-pointer"
          >
            {t("actions.delete_all_journals_button")}
                  </button>
                  {confirmDelete.deleteJournals &&
                      <ConfirmDeleteModal  setShowDeleteModal={(show) => SetConfirmDelete((e) => ({...e , deleteJournals:show}))} to="/home" prompt={{ key:"actions.delete_everything",prompt:"I want to delete everthing"}} route="journals" toast_msg_key="actions.deleted_journals" />
                  
                  }
        </div>

        <div className="space-y-4 rounded-xl p-6 ">
          <h2 className="text-2xl font-semibold text-red-600">{ t("actions.delete_account_title")}</h2>
          <p className="text-sm font-semibold text-red-500">
            { t("actions.delete_account_description")}
          </p>
        <button
            onClick={()=>SetConfirmDelete((e)=>({...e ,deleteAccount:true}))}          
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow transition cursor-pointer"
          >
            { t("actions.delete_account_button")}
                  </button>
                  {confirmDelete.deleteAccount && 
                      <ConfirmDeleteModal  setShowDeleteModal={(show) => SetConfirmDelete((e) => ({...e , deleteAccount:show}))} to="/login" prompt={{key:"actions.delete_account" ,prompt:"I want to delete my account"}} route="me" toast_msg_key="deleted_account" />
                  }
        </div>
      </div>
    </div>
  );
}
