import SideBar from "../components/SideBar";
import SideTrash from "../components/SideTrash";
import MyNavBar from "../components/MyNavBar";
import MyProjectsList from "../components/MyProjectsList";
import MyTrashList from "../components/MyTrashList";
import DisplayCard2 from "../components/DisplayCard2";
import Confirm from "../components/Confirm";
import { deleteFromTrash, getDesignById, moveToTrash, restoreFromTrash } from "../api/api";
import { useState } from "react";

function MyCreations({ creations , trash , proTrash , setProTrash , token}) {

  const [design , setDesign] = useState('');  
  const [tryComfirm , setTryConfirm] = useState(false);
  const [confirmed , setConfirmed] = useState('');
  const [deleteDesign , setDeleteDesign] = useState({});

  const handleDeleteCreation = async ( proj ) => {
    try {
      const result = moveToTrash(proj._id, token)
       window.location.reload();

    } catch (error) {
      console.log(error)
    }
  }

    const fetchDesign = async (id) => {
      try {
        const res = await getDesignById(id , token);
        console.log(res);
        setDesign(res);
      } catch (error) {
        console.log(error);
      }
    }

    const handleTrash = (id , mode) => {

      if(mode == 'Delete'){
        try {
          const res = deleteFromTrash(id , token);
          console.log(res);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
      else if(mode == 'Restore'){
         try {
          const res = restoreFromTrash(id, token);
          console.log(res);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
      else{
        return;
      }
    }

  return (
    <div className="h-[100vh] w-full flex bg-purple-50">
      <MyNavBar setProTrash={setProTrash} proTrash={proTrash} />

      <div className="flex w-[95.5%] ">
        { proTrash ?
          <SideTrash trash={trash} /> :
          <SideBar creations={creations} handleDeleteCreation={handleDeleteCreation} />}
      
        { proTrash ? 
          <MyTrashList trash={trash} setTryConfirm={setTryConfirm} setDeleteDesign={setDeleteDesign} /> :
          <MyProjectsList creations={creations} fetchDesign={fetchDesign} /> 
        }
      </div>

      {
        design ?
        <DisplayCard2 design={design} setDesign={setDesign} handleDeleteCreation={handleDeleteCreation}/> : ''
      }
        
        {
        tryComfirm ? 
        <Confirm deleteDesign={deleteDesign} setTryConfirm={setTryConfirm} handleTrash={handleTrash} /> : ''
        }
    </div>
  );
}

export default MyCreations;
