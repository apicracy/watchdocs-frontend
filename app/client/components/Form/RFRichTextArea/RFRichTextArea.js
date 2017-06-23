import React, { Component, PropTypes } from 'react';
import TinyMCE from 'react-tinymce-input';

export default class RFRichTextArea extends Component {
  static propTypes = {
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
    plugins: 'autolink link image lists preview',
    toolbar: 'undo redo | formatselect bullist numlist | bold italic link underline | image code paste',
    block_formats: 'Heading 1=h1;Heading 2=h2;Heading 3=h3;Paragraph=p',
    menubar: false,
    height: 220,
    statusbar: false,
    paste_word_valid_elements: 'b,strong,i,em,h1,h2,h3,p,li,ul,ol,a',
    paste_retain_style_properties: 'none',
    paste_strip_class_attributes: 'none',
    paste_remove_styles: true,
  }


  render() {
    return (
      <TinyMCE
        tinymceConfig={this.editorConfig}
        {...this.props.input}
      />
    );
  }
}
