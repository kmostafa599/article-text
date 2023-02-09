import React from 'react'

const Popup = ({open, setOpen,toggleEdit, setToggleEdit, textString, handleChange, handleCommentChange, handleSave, currentComment,comment}) => {
  return (
    <div className='container' style={{
        right: open ? '200px' : '-300px', transitionProperty: 'all',
        transitionDuration: '75ms'
      }}>
        {currentComment ?
          <div
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column', }}
          >
            {!toggleEdit ?
              <div style={{ width: '100%', paddingLeft: "2rem" }}>
                <div style={{ textAlign: 'centeleftr' }} >
                  Comment for "{textString}":
                </div>
                <div style={{ textAlign: 'center' }}>

                </div>
                {currentComment}
              </div> : <input type="text" value={currentComment} onChange={handleCommentChange} />}

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
                <div className="cancel" onClick={() => setOpen(false)} >Cancel</div>
              </div>
            </div>
            <br />
          </div>}

      </div>
  )
}

export default Popup