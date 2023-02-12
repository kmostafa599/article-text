import { useState } from 'react'
import { createEditor} from 'slate'
import HoveringToolbar from '../components/HoveringToolbar'
import { withReact } from 'slate-react'
import Popup from '../components/Popup'

export default function Home() {
  const [editor] = useState(() => withReact(createEditor()))
  const [descriptions, setDescriptions] = useState([])
  const [open, setOpen] = useState(false)
  const [textId, setTextId] = useState('')
  const [comment, setComment] = useState('')
  const [currentComment, setCurrentComment] = useState('')
  const [toggleEdit, setToggleEdit] = useState(false)
  const [textString,setTextString] =useState('')

  //adding text to descriptions list
  const addText = (newText) => setDescriptions(d => [...d, newText])
  //
  const hasComment = (text) => {
    console.log("HAS COMMENT TEXT: ", text)
    //extracting the text from descriptions
    let temp = descriptions.filter(d => d?.id == text?.id)[0]
    console.log(temp)
    //check if it has comment
    if (temp?.comment) {
      console.log("COMMENT FOUND")
      setCurrentComment(temp.comment) //assign their comment
      return true
    }
    console.log("COMMENT NOT FOUND")
  }

  const handleClick = (text) => {
    //clear current comment
    setComment('')
    setCurrentComment('')
    console.log("STEP 1")
    console.log("Hello")
    console.log(text)
    if(text?.text==null){
      return
    }
    setOpen(true);
    
    //set current selected text
    setTextString(text?.text)
    setTextId(text?.id)
    
    console.log("TEXT ID: ", text.id)
    //check if text is saved prevousily
    const value = descriptions.filter(item => item?.id == text?.id)
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
      let objIndex = descriptions.findIndex((item) => item?.id == textId)
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
    let objIndex = descriptions.findIndex((item) => item?.id == textId)
    //save all desc. to temp array
    let tempArr = [...descriptions]
    //set current text id and text string
    setTextId(tempArr[objIndex]?.id)
    setTextString(tempArr[objIndex]?.text)
    //update text object in the temp array
    tempArr[objIndex] = {
      id: tempArr[objIndex]?.id,
      text: tempArr[objIndex]?.text,
      popup: true,
      comment: comment,
    }
    //set desc. to the new created array
    setDescriptions(tempArr)
    //set current comment to the comment
    setCurrentComment(comment)
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: "5rem" }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'fixed', left: '100px', width: '50%' }}>
          <HoveringToolbar open={open} setOpen={setOpen} handleClick={handleClick} hasComment={hasComment} descriptions={descriptions}/>
        </div>

        <Popup open={open} setOpen={setOpen} toggleEdit={toggleEdit}
          setToggleEdit={setToggleEdit}
          textString={textString}
          handleChange={handleChange}
          handleCommentChange={handleCommentChange}
          handleSave={handleSave}
          currentComment={currentComment}
          comment={comment}
          descriptions={descriptions}
          setDescriptions={setDescriptions}
          textId={textId}
        />
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