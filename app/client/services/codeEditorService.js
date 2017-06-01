import {
  EditorState,
  SelectionState,
  Modifier,
  convertFromRaw,
} from 'draft-js';

import {
  JSONSchemaToJSONLines,
  JSONtoJSONSchema,
} from 'services/JSONSchemaService';


const initialBlocks = [
  {
    text: '{',
    type: 'code-block',
  },
  {
    text: '}',
    type: 'code-block',
  },
];


export function editorCodeEqual(prevCode, nextCode) {
  return prevCode.replace(/(\r\n|\n|\r|\s)/gm, '') ===
           nextCode.replace(/(\r\n|\n|\r|\s)/gm, '');
}

/*
  Utilizes Draft-js API to keep cursor on the same
  position after the editior is updated with formatted JSON.
  It gets numer of row and column of the cursor from before update
  and moves the cursor there after update.
*/
export function createNewEditorState(prevEditorState, newContent) {
  const prevSelection = prevEditorState.getSelection();
  const prevSelectedBlockKey = prevSelection.getFocusKey();
  const prevCursorOffset = prevSelection.getFocusOffset();
  const prevBlocks = prevEditorState.getCurrentContent().getBlocksAsArray();
  const prevLine = prevBlocks.findIndex(block => block.key === prevSelectedBlockKey);

  const newEditorState = EditorState.createWithContent(newContent);
  const newBlocks = newEditorState.getCurrentContent().getBlocksAsArray();
  const blockToPlaceCursor = newBlocks[prevLine] || newBlocks[newBlocks.length - 1];
  let selectionState = SelectionState.createEmpty(blockToPlaceCursor.key);
  selectionState = selectionState.set('hasFocus', true);
  selectionState = selectionState.set('anchorOffset', prevCursorOffset);
  selectionState = selectionState.set('focusOffset', prevCursorOffset);

  return EditorState.forceSelection(newEditorState, selectionState);
}


export function formatJSON(json) {
  const jsonSchema = JSONtoJSONSchema(json);
  return JSONSchemaToJSONLines(jsonSchema);
}

export function contentStateFromPlainText(plainText, editorState) {
  const blocks = plainText.split('\n').map(line => (
    {
      text: line,
      type: 'code-block',
    }
  ));

  const blockMap = convertFromRaw({
    entityMap: {},
    blocks,
  }).blockMap;

  return Modifier.replaceWithFragment(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    blockMap,
  );
}

export function createContentState(linesOfCode) {
  let blocks;
  if (linesOfCode.length > 0) {
    blocks = linesOfCode.map(line => (
      {
        text: line.line,
        type: 'code-block',
        data: line,
      }
    ));
  } else {
    blocks = initialBlocks;
  }

  return convertFromRaw({
    entityMap: {},
    blocks,
  });
}
