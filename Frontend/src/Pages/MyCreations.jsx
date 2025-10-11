import SideBar from "../components/SideBar";
import SideTrash from "../components/SideTrash";
import MyNavBar from "../components/MyNavBar";
import MyProjectsList from "../components/MyProjectsList";
import MyTrashList from "../components/MyTrashList";
import DisplayCard2 from "../components/DisplayCard2";
import Confirm from "../components/Confirm";
import { deleteFromTrash, moveToTrash, restoreFromTrash } from "../api/api";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

function MyCreations({ setCreations, setTrash, creations , trash , token , user, setShowProfile}) {

  const [design , setDesign] = useState('');  
  const [tryComfirm , setTryConfirm] = useState(false);
  const [deleteDesign , setDeleteDesign] = useState({});
  const [mode , setMode] = useState('');

  const handleDeleteCreation = async ( proj ) => {
    try {
      setCreations((prev) => prev.filter((item) => item._id !== proj._id));
      setTrash((prev) => [...prev, proj]);
      const result = await moveToTrash(proj._id, token);
    } catch (error) {
      console.log(error)
    }
  }


  const handleTrash = async (id, mode) => {
  try {
    if (mode === 'Delete') {
      setTrash((prev) => prev.filter((item) => item._id !== id));
      setCreations((prev) => prev.filter((item) => item._id !== id));
      const res = await deleteFromTrash(id, token);
    } else if (mode === 'Restore') {
      setTrash((prev) => prev.filter((item) => item._id !== id));
      setCreations((prev) => [...prev, deleteDesign]);
      const res = await restoreFromTrash(id, token);
    }
  } catch (error) {
    console.log(error);
  }
};


  return (
        <div className="h-[100vh] w-full flex flex-col sm:flex-row bg-purple-50">
          <MyNavBar user={user} setShowProfile={setShowProfile} />

          <Routes>
            <Route path="/" element={<Navigate to="projects" replace />} />
            <Route
              path="projects"
              element={<MyProjectsList creations={creations} setDesign={setDesign} setMode={setMode} handleDeleteCreation={handleDeleteCreation} />}
            />
            <Route
              path="trash"
              element={<MyTrashList trash={trash} setDesign={setDesign} setMode={setMode} />}
            />
          </Routes>

          { design &&
            <DisplayCard2 mode={mode} design={design} setDeleteDesign={setDeleteDesign} setTryConfirm={setTryConfirm} setDesign={setDesign} handleDeleteCreation={handleDeleteCreation} />
          }
          {tryComfirm && (
            <Confirm deleteDesign={deleteDesign} setTryConfirm={setTryConfirm} handleTrash={handleTrash} />
          )}
        </div>
  );
}

export default MyCreations;
