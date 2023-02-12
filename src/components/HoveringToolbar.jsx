import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Slate, Editable, withReact, useSlate, useFocused } from 'slate-react'
import {
  Editor,
  Transforms,
  Text,
  createEditor,
  Descendant,
  Range,
} from 'slate'
import { withHistory } from 'slate-history'
import ReactDOM from 'react-dom'
import { cx, css } from '@emotion/css'
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
// import { Button, Icon, Menu, Portal } from '../components'
export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }
      
    ,
    ref
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `
      )}
    />
  )
)
export const Icon = React.forwardRef(
    (
      { className, ...props },
      ref
    ) => (
      <span
        {...props}
        ref={ref}
        
      />
    )
  )
export const Portal = ({ children }) => {
    const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)

      return () => setMounted(false)
   }, [])

   return mounted
      ? ReactDOM.createPortal(children, 
        document.body)
      : null
}


  export const Menu = React.forwardRef(
    (
      { className, ...props },
      ref
    ) => (
      <div
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            & > * {
              display: inline-block;
            }
            & > * + * {
              margin-left: 15px;
            }
          `
        )}
      />
    )
  )
const HoveringMenuExample = ({open,setOpen,handleClick,currentComment}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [arr,setArr] = useState([])
  const onDoubleClick = () =>{
    // (event)=>{
      // console.log(event)
      toggleFormat(editor,"popup",open, setOpen)
    return true
  }
  return (
    <Slate editor={editor} value={initialValue}
    // onChange={}
    
    >
      <HoveringToolbar open={open} setOpen={setOpen} handleClick={handleClick} currentComment={currentComment}/>
      <Editable
        renderLeaf={props => <Leaf {...props} handleClick={handleClick}/>}
        placeholder="Enter some text..."
        onDoubleClick={onDoubleClick}
      
       
      />
    </Slate>
  )
}

const toggleFormat = (editor, format,open,setOpen) => {
  const isActive = isFormatActive(editor, format)
  let id = uuidv4()
  setOpen(true)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true, id:id },
    { match: Text.isText, split: true,at:editor.selection },
  )
  // setOpen(true)
}

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: 'all',
  })
  return !!match
}

const Leaf = ({ attributes, children, leaf, handleClick}) => {
  if(leaf.popup){
    children = <a className="highlited" onClick={()=>handleClick(leaf)}>{children}</a>
  }
  return <span {...attributes}>{children}</span>
}

const HoveringToolbar = ({open,setOpen,handleClick,currentComment}) => {
  const ref = useRef()
  const editor = useSlate()
  const inFocus = useFocused()
  const {selection} = editor
  const [domCurrentSelection,setDOMCurrentSelection] = useState('')
  useEffect(() => {
    // document.onselectionchange = () => {
    //   console.log(document.getSelection());
    //   toggleFormat(editor, "popup");
    //   setTimeout(()=>console.log(1000),1000)

    // };
      
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }
    // editor.onChange(()=>toggleFormat(editor,"popup"))
    const domSelection = window.getSelection()
      // setDOMCurrentSelection(domSelection)

        if(domSelection){
          const domRange =  domSelection?.getRangeAt(0)
          console.log(domRange?.getBoundingClientRect())
          const rect = domRange?.getBoundingClientRect()
          el.style.opacity = '1'
          el.style.top = `${rect?.top + window.pageYOffset + el.offsetHeight}px`
          el.style.left = `${rect?.left +
            window.pageXOffset -
            el.offsetWidth / 2 +
            rect?.width / 2}px`
         
        }
},[selection])

  return (
    <Portal>
      {/* <Menu
        ref={ref}
       
      > className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
        onMouseDown={e => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault()
        }}
        <FormatButton format="popup" icon="Start Annotation" open={open} setOpen={setOpen} currentComment={currentComment}/>

      </Menu> */}
    </Portal>
  )
}

const FormatButton = ({ format, icon,open, setOpen, handleClick,currentComment,domCurrentSelection }) => {
  const editor = useSlate()
  // console.log(editor.children)
  // console.log("FORMAT BUTTON: ",editor.selection)
  // let obj = editor.children.find((child) => {
  //   return child.children.some((item) => {
  //     return item.popup === true;
  //   });
  // })

  // let elements = obj?.children?.filter(i=>i?.popup) 
  // console.log("elements",elements)
  // let fullText = ''
  // elements?.map(element=>{fullText += element.text} )
  // console.log("fullText",fullText)

//   console.log(editor.children[0].children.filter(child=>child?.popup))
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onClick={() => {toggleFormat(editor, format,open,setOpen);}}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
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