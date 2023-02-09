import { useState } from 'react'
import { createEditor} from 'slate'
import HoveringToolbar from './components/HoveringToolbar'
import { withReact } from 'slate-react'
import Popup from './components/Popup'

export default function Home() {
  const [editor] = useState(() => withReact(createEditor()))
  const [descriptions, setDescriptions] = useState([])
  const [open, setOpen] = useState(false)
  const [textId, setTextId] = useState('')
  const [comment, setComment] = useState('')
  const [currentComment, setCurrentComment] = useState('')
  const [toggleEdit, setToggleEdit] = useState(false)
  const [textString,setTextString] =useState('')

  const addText = (newText) => setDescriptions(d => [...d, newText])
  const hasComment = (text) => {
    console.log("HAS COMMENT TEXT: ", text)
    let temp = descriptions.filter(d => d.id == text.id)[0]
    console.log(temp)
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
    setTextString(text.text)
    setTextId(text.id)
    
    console.log("TEXT ID: ", text)
    const value = descriptions.filter(item => item.id == text.id)
    if (!value.length) {
      console.log("Not found")
      addText(text)
      return
    }
    console.log("FOUND")
    //filter and assign id to textId
    hasComment(text)
    console.log("DESCRIPTIONS: ", descriptions)

  }
  const handleChange = (e) => {
    setComment(e.target.value)
    console.log(e.target.value)
  }
  const handleCommentChange = (e) => {
    console.log(e.target.value)
    setCurrentComment(e.target.value)
  }
  const handleSave = (text) => {
    console.log("NEW COMMENT", comment)

      // edit mode
    if (text == 'inline') {
      let objIndex = descriptions.findIndex((item) => item.id == textId)
      let tempArr = [...descriptions]
      setTextId(tempArr[objIndex]?.id)
      setTextString(tempArr[objIndex]?.text)
      tempArr[objIndex] = {
        id: tempArr[objIndex]?.id,
        text: tempArr[objIndex]?.text,
        popup: true,
        comment: currentComment,
      }
      setDescriptions(tempArr)
      setCurrentComment(currentComment)
      return
    }
    let objIndex = descriptions.findIndex((item) => item.id == textId)
    let tempArr = [...descriptions]
    setTextId(tempArr[objIndex]?.id)
      setTextString(tempArr[objIndex]?.text)
    tempArr[objIndex] = {
      id: tempArr[objIndex]?.id,
      text: tempArr[objIndex]?.text,
      popup: true,
      comment: comment,
    }
    setDescriptions(tempArr)
    setCurrentComment(comment)
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: "5rem" }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'fixed', left: '100px', width: '50%' }}>
          <HoveringToolbar open={open} setOpen={setOpen} handleClick={handleClick} />
        </div>

        <Popup open={open} setOpen={setOpen} toggleEdit={toggleEdit}
setToggleEdit={setToggleEdit}
textString={textString}
handleChange={handleChange}
handleCommentChange={handleCommentChange}
handleSave={handleSave}
currentComment={currentComment}
comment={comment}/>

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