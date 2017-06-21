import React, { Component, PropTypes } from 'react';
import TinyMCE from 'react-tinymce';

export default class RFRichTextArea extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      onBlur: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentWillReceiveProps() {
    // we dont ever need to update this, manages the dom itself
    return false;
  }

  editorConfig = {
    plugins: 'link,image,lists,paste,code',
    toolbar: 'undo redo | formatselect bullist numlist | bold italic link | image code paste',
    block_formats: 'Paragraph=p;Heading 3=h3',
    menubar: false,
    statusbar: false,
    body_class: 'editable-field-content',
    paste_word_valid_elements: 'b,strong,i,em,h1,h2,h3,p,li,ul,ol,a',
    paste_retain_style_properties: 'none',
    paste_strip_class_attributes: 'none',
    paste_remove_styles: true,
  }

  editorContent = () => {
    return tinyMCE.get(this.props.id) ? tinyMCE.get(this.props.id).getContent() : '';
  }

  render() {

    const { id } = this.props;
    const { onBlur, value, onChange } = this.props.input;

    return (
      <TinyMCE
        id={id}
        content={value}
        config={this.editorConfig}
        onBlur={() => {
          onBlur();
          onChange(this.editorContent());
        }}
      />
    );
  }
}
