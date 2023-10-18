import React, { useEffect } from 'react'
import { ItemMaterial } from '../../Components'

// Hooks
import { UseFileTaskContext } from '../../Hooks/fileTaskUseContext'

const TugasAkhir = () => {
  const {dispatch} = UseFileTaskContext();
  useEffect(() => {
    fetch("/api/file/taskStudent").then(response => {
      return response.json();
    }).then(data => {
      dispatch({type: "SET", payload: data});
    });
  },[dispatch])
  
  return (
    <div>
      <ItemMaterial category_file="TugasAkhir"/>
    </div>
  )
}

export default TugasAkhir