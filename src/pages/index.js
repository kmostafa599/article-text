import { Handlee, Inter, Lateef } from '@next/font/google'
import styles from '@/styles/Home.module.css'
// Import React dependencies.
import { useCallback, useEffect, useState } from 'react'
// Import the Slate editor factory.
import { createEditor, Editor, Transforms } from 'slate'
import HoveringToolbar from '../HoveringToolbar'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { Value } from 'slate'
import Form from '@/Form'
const inter = Inter({ subsets: ['latin'] })
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]


const renderElement = props => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />
    default:
      return <DefaultElement {...props} />
  }
}
export default function Home() {
  const [editor] = useState(() => withReact(createEditor()))
  const [descriptions, setDescriptions] = useState([])
  const [open, setOpen] = useState(false)
  const [toggle, setToggle] = useState('form') // form || comment
  const [textId, setTextId] = useState('')
  const [comment, setComment] = useState('')
  const [currentComment, setCurrentComment] = useState('')
  const [toggleEdit, setToggleEdit] = useState(false)
  const [tempComment, setTempComment] = useState('')
  useEffect(() => {
    console.log("VALUE", Value)


  }, [initialValue, currentComment]);
  const addText = (newText) => setDescriptions(d => [...d, newText])
  const hasComment = (text) => {
    console.log("HAS COMMENT TEXT: ", text)
    let temp = descriptions.filter(d => d.text == text.text)[0]
    console.log(temp)
    // console.log(temp)
    if (temp.comment) {
      console.log("SET CURRENT COMMENT")

      setCurrentComment(temp.comment)
    }
  }

  const handleClick = (text) => {
    console.log("Hello")
    setOpen(!open);
    //clear current comment
    setComment('')
    setCurrentComment('')
    //set current selected text
    setTextId(text.text)
    console.log("TEXT ID: ", text)
    const value = descriptions.filter(item => item.text == text.text)
    if (!value.length) {
      console.log("Not found")
      addText(text)
      return
    }
    console.log("FOUND")
    //filter and assign id to textId
    hasComment(text)
    // let temp = [...descriptions,{text:text}] 
    // setDescriptions(descriptions)
    console.log("DESCRIPTIONS: ", descriptions)

  }
  const handleChange = (e) => {
    setComment(e.target.value)
    console.log(e.target.value)
  }
  const handleCommentChange = (e) => {
    console.log(e.target.value)
    setCurrentComment(e.target.value)
    // descriptions.filter()
    setTempComment()
  }
  const handleSave = (text) => {
    console.log("NEW COMMENT", comment)
    // let index = descriptions.indexOf(textId)
    // let objIndex = descriptions.map((d,i)=>{if(d.text==textId){return i}})
    // setTextId(text.text)

    if (text == 'inline') {
      // setTextId(text)
      let objIndex = descriptions.findIndex((item) => item.text == textId)
      let tempArr = [...descriptions]
      setTextId(tempArr[objIndex]?.text)
      tempArr[objIndex] = {
        text: tempArr[objIndex]?.text,
        popup: true,
        comment: currentComment,
      }
      setDescriptions(tempArr)
      return

    }
    let objIndex = descriptions.findIndex((item) => item.text == textId)
    let tempArr = [...descriptions]
    tempArr[objIndex] = {
      text: tempArr[objIndex]?.text,
      popup: true,
      comment: comment,
    }
    setDescriptions(tempArr)
    setCurrentComment(comment)
    console.log(textId)
    console.log("index", objIndex)
    console.log(descriptions)
    console.log("SAVE")
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: "5rem" }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'fixed', left: '100px', width: '50%' }}>
          <HoveringToolbar open={open} setOpen={setOpen} textId={textId} setTextId={setTextId} handleClick={handleClick} />

        </div>

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
                    Comment for "{textId}":
                  </div>
                  <div style={{ textAlign: 'center' }}>

                  </div>
                  {currentComment}
                </div> : <input type="text" value={currentComment} onChange={handleCommentChange} onBlur={() => setToggleEdit(false)} />}

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
                <div className="add-image">
                  <div>Add image</div>
                </div>
                <div className='profile-container'>
                  <div className="like-counter" style={{ paddingRight: '5px' }}>Tips</div>
                  <div className="like-counter" >Formatting</div>
                </div>
              </div>
              <br />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0px 2rem' }}>
                <textarea name="description" id="description" cols="30" rows="40" placeholder='Add comment' value={comment != '' ? comment : ''} onChange={handleChange}></textarea>
                <br />
                <div className='form-footer' style={{ width: '100%' }}>
                  <div className="save" onClick={handleSave} >Save</div>
                  <div className="cancel" onClick={() => setOpen(false)} >Cancel</div>
                </div>
              </div>
              <br />
            </div>}

        </div>

      </div>
    </div>)
}
const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}
const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}