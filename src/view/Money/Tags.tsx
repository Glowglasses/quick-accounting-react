import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import {HandleTag} from './HandleTag';
import {Tag, useTags} from 'hooks/useTags';

const Wrapper = styled.div`
  width: 89%;
  height: 27%;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  flex-grow: -1;

  > ol {
    display: flex;
    height: 100%;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow: auto;

    > li {
      font-size: 1.2em;
      text-align: center;
      display: block;
      width: 20%;
      margin-left: 4%;
      padding: 8px 0 8px 0;
      border-radius: 8px;
      word-break: break-all;
      user-select: none;

      &.add {
        border: none;
      }

      &.selected {
        background-color: #dcdcdc;
      }
    }
  }
`;
const Tags: React.FC<{category: ('+' | '-')}> = (props) => {
  const {tags, setTags} = useTags();
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [handleTagVisible, setHandleTagVisible] = useState(false);
  const handleType = useRef('add');
  let timer = -1;
  let isEdit = false;
  const editTagValue = useRef<Tag>({name: '', id: -1,type: '-'});
  const triggerTag = (id: number) => {
    const index = selectedList.findIndex(item => id === item);
    if (index > -1) {
      const newSelectedList = [...selectedList];
      newSelectedList.splice(index, 1);
      setSelectedList(newSelectedList);
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const editTag = (value: Tag) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      handleType.current = 'edit';
      editTagValue.current = value;
      setHandleTagVisible(true);
      isEdit = true;
    }, 500);
  };
  const endTouch = () => {
    if (!isEdit) {
      clearTimeout(timer);
    }
  };

  return (
    <Wrapper>
      {!handleTagVisible ? <>
        <ol>
          {tags.map((item) => item.type === props.category?<li key={item.id} onClick={() => triggerTag(item.id)}
                                                               onTouchStart={() => {editTag({id: item.id, name: item.name,type: props.category});}}
                                                               onTouchEnd={endTouch}
                                                               className={selectedList.find(id => id === item.id) !== undefined ? 'selected' : ''}>
            {item.name}</li>: null)}
          <li className="add" onClick={() => {
            setHandleTagVisible(true);
            handleType.current = 'add';
            editTagValue.current = {name: '', id: -1,type: '-'}
          }}><Icon name="addTags"/></li>
        </ol>
      </> : <HandleTag type={handleType.current} categoryType={props.category} onChange={(value, updateTags) => {
        setHandleTagVisible(value);
        setTags(updateTags);
      }} editValue={editTagValue.current}/>}
    </Wrapper>
  );
};
export {Tags};