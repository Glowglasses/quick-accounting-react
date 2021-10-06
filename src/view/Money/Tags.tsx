import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import {HandleTag} from './HandleTag';
import {Tag, useTags} from 'hooks/useTags';
import {CategoryType} from '../../components/Category';
import {useRecords} from '../../hooks/useRecords';

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
type Props = {
  category: CategoryType
  onChange: (selectIds: number[]) => void
}
const Tags: React.FC<Props> = (props) => {
  const {tags, setTags} = useTags();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [handleTagVisible, setHandleTagVisible] = useState(false);
  const handleType = useRef('add');
  const refCategory = useRef<CategoryType>(props.category);
  const {currentRecord} = useRecords();
  let timer = -1;
  let isEdit = false;
  const editTagValue = useRef<Tag>({name: '', id: -1, type: '-'});
  const triggerTag = (id: number) => {
    const index = selectedIds.findIndex(item => id === item);
    let newSelectedIds = [...selectedIds];
    if (index > -1) {
      newSelectedIds.splice(index, 1);
      setSelectedIds(newSelectedIds);
    } else {
      newSelectedIds = [...selectedIds, id];
      setSelectedIds(newSelectedIds);
    }
    props.onChange(newSelectedIds);
  };

  useEffect(() => {
    refCategory.current = props.category;
  }, [props]);

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('isEdit') || 'false')) {
      if (currentRecord) {
        refCategory.current = currentRecord.category;
        setSelectedIds(currentRecord.tagIds);
        props.onChange(currentRecord.tagIds);
      }
    }
  }, [currentRecord]);

  useEffect(() => {
    setSelectedIds([]);
  }, [props.category]);


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
          {tags.map((item) => item.type === refCategory.current ? <li key={item.id} onClick={() => triggerTag(item.id)}
                                                                      onTouchStart={() => {
                                                                        editTag({
                                                                          id: item.id,
                                                                          name: item.name,
                                                                          type: props.category
                                                                        });
                                                                      }}
                                                                      onTouchEnd={endTouch}
                                                                      className={selectedIds.find(id => id === item.id) !== undefined ? 'selected' : ''}>
            {item.name}</li> : null)}
          <li className="add" onClick={() => {
            setHandleTagVisible(true);
            handleType.current = 'add';
            editTagValue.current = {name: '', id: -1, type: '-'};
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