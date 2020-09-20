import React from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import PropTypes from "prop-types";
//import htmlToDraft from "html-to-draftjs";
//import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
);

const styles = {
  labelOffset: 110,
  focused: true,
  textFiledStyle: {
    color: "#4a4a4a",
    width: "100%",
    lineHeight: 1.5,
    borderRadius: 6,
    fontSize: 16,
    border: "0px solid #FFF"
  },
  styleMap: {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 20,
      padding: 2
    }
  },
  helpTextStyle: {
    color: "#195091",
    fontSize: 12,
    paddingLeft: 8
  }
};
function ControlledEditor(props) {
  //const contentBlock = htmlToDraft(props.value);
  //const contentState = ContentState.createFromBlockArray(
  //  contentBlock.contentBlocks
  //);
  //const [editorState, setEditorState] = React.useState(
  //  EditorState.createWithContent(contentState)
  //);
  //const onEditorStateChange = editorState => {
  //  const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  //  props.formikProps.setFieldValue(props.name, value);
  //  setEditorState(editorState);
  //};

  return (
    <React.Fragment>
      <label style={{ color: "#195091", fontSize: 16, paddingLeft: 2 }}>
        {props.displayLabel}
      </label>
      <Editor
        {...props}
        //editorState={editorState}
        customStyleMap={styles.styleMap}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        // onEditorStateChange={onEditorStateChange}
        spellCheck={true}
      />
      {/*!(meta.touched && Boolean(meta.error)) && (
        <FormHelperText
          id="helper-text-filterSkills"
          style={{
            ...styles.helpTextStyle,
            marginTop: meta.touched && meta.error ? height : -5,
          }}
        >
          {props.displayLabel}
        </FormHelperText>
        )*/}
    </React.Fragment>
  );
}

ControlledEditor.propTypes = {
  name: PropTypes.string,
  displayLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      candidate_resume: PropTypes.arrayOf(PropTypes.string.isRequired)
    }).isRequired,
    setFieldValue: PropTypes.func.isRequired
  })
};
export default ControlledEditor;
