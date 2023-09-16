import React, { useRef } from "react"
import { Editor, IAllProps } from "@tinymce/tinymce-react"

type Props = {}

const CustomEditor = (props: IAllProps) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_FORM_EDITOR}
      //   initialValue="<p>This is the initial content of the editor.</p>"

      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      {...props}
    />
  )
}

export default CustomEditor
