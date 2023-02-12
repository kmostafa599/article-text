import React from 'react'

const Popup = ({open, setOpen,toggleEdit, setToggleEdit, textId,textString, handleChange, handleCommentChange, handleSave, currentComment,comment,descriptions,setDescriptions}) => {
  return (
    <div className='container' style={{
        right: open ? '200px' : '-300px', transitionProperty: 'all',
        transitionDuration: '75ms'
      }}>
        {currentComment ?
          <div
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}
          >
            {!toggleEdit ?
            <div style={{padding:"1rem"}}>
             <div style={{fontSize:"1.5em",textAlign:"center"}}>Comment for</div>  
 <div style={{ width: '100%', textAlign:"left"}}>
  
                  <span style={{margin:"1rem",padding:"1rem", width:"100%", textAlign:"left"}}><div style={{backgroundColor:"#c9c9c9",padding:"0.1rem",textAlign:"center"}}>"{textString}" </div> </span>
                  <br /> 
                  <div style={{textAlign:"center",fontWeight:"bold"}}>
                  {/* <span style={{margin:"1rem"}}></span> */}
                  {currentComment}
                  </div>
              </div>
            </div>
              : <input type="text" value={currentComment} onChange={handleCommentChange} />}

            <div>
              <br />
              {!toggleEdit ?
                <div className='save' onClick={() => setToggleEdit(true)}>
                  Edit
                </div> : <div className="save" onClick={() => { handleSave("inline"); setToggleEdit(false) }} >Save</div>
              }
              <div className='cancel' onClick={() => toggleEdit ? setToggleEdit(false) : setOpen(false)}>cancel</div>

            </div>

          </div>
          : <div>
            <div className='header'>
              {/* <div className="add-image">
                <div>Add image</div>
              </div>
              <div className='profile-container'>
                <div className="like-counter" style={{ paddingRight: '5px' }}>Tips</div>
                <div className="like-counter" >Formatting</div>
              </div> */}
            </div>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0px 2rem' }}>
              <textarea name="description" id="description" cols="30" rows="40" placeholder='Add comment' value={comment != '' ? comment : ''} onChange={handleChange}></textarea>
              {/* <RichTextExample style={{height:'50px',width:'50px'}}/> */}
              <br />
              <div className='form-footer' style={{ width: '100%' }}>
                <div className="save" onClick={handleSave} >Save</div>
                <div className="cancel" onClick={() =>{
                  if(comment == ""){
                    // console.log(temp)
                    if(descriptions){
                      console.log(textId)
                      let temp = descriptions?.filter(d=>d.id != textId)
                      console.log("temp: ",temp)
                      setDescriptions(temp)
                      console.log("DESC..",descriptions)
                    }
                  }
                  // if(descriptions)
                  setOpen(false)
                } } >Cancel</div>
              </div>
            </div>
            <br />
          </div>}

      </div>
  )
}

export default Popup