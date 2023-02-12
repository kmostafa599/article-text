import React, { useMemo} from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import {
  Editor,
  Transforms,
  Text,
  createEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

const HoveringMenuExample = ({open,setOpen,handleClick,currentComment,descriptions,textId}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const onClickCapture = (e) =>{
    if(descriptions.filter(d=>d.id==textId)[0]){
      console.log(descriptions.filter(d=>d.id==textId)[0])
      // return
      e.preventDefault()
      return
    }
    toggleFormat(editor,"popup",open, setOpen,handleClick)
    // return true
  }
  return (
    <Slate editor={editor} value={initialValue}    
    >
      <Editable
        renderLeaf={props => <Leaf {...props} handleClick={handleClick} descriptions={descriptions} textId={textId}/>}
        placeholder="Enter some text..."
        onClickCapture={onClickCapture}
      />
    </Slate>
  )
}

const toggleFormat = (editor, format,open,setOpen, handleClick) => {
  // const editor = useSlate()
  // console.log(editor.children)
  
  const isActive = isFormatActive(editor, format)
  let id = uuidv4()
  // const {selection} = editor
  // console.log(selection)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true, id:id },
    { match: Text.isText, split: true,at:editor.selection },
  )
  // console.log(editor)
  let obj = editor.children.find((child) => {
    return child.children.some((item) => {
      return item.id === id;
    });
  })
  console.log({obj})
  let element = obj?.children?.filter(i=>i?.id==id)[0]

  console.log({element})
  // if(element?.text !== null){
  //   setOpen(true)

  // }
  setOpen(false)
  
  handleClick(element)

  // setOpen(true)
}

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: 'all',
  })
  console.log("match: ", match)
  return !!match
}

const Leaf = ({ attributes, children, leaf, handleClick, descriptions,textId}) => {
  if(leaf.popup){
    let flag = false
    descriptions?.map(d=>{if(leaf.id===d.id){
      if(d.comment){
        flag = true
      }
    }})
    children = <a className={flag?"highlited":null} onClick={(e)=>{
      if(descriptions.filter(d=>d.id==textId)[0]){
        e.preventDefault();
        return
      }
      handleClick(leaf)
    }}>{children}</a>
  }
  return <span {...attributes}>{children}</span>
}




const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'This example shows how you can make a hovering menu appear above your content, which you can use to make text ',
      },
      { text: 'bold', bold: true },
      { text: ', ' },
      { text: 'italic', italic: true },
      {text:" helloo", popup:true},
      { text: ', or anything else you might want to do!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Try it out yourself! Just ' },
      { text: 'select any piece of text and the menu will appear', bold: true },
      { text: '.' },
    ],
  },
]

export default HoveringMenuExample