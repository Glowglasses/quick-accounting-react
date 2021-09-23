import React, {LegacyRef, useRef, useState} from 'react';
import styled from 'styled-components';
import Icon from '../../components/Icon';

const Wrapper = styled.div`
  width: 90%;
  margin: 30px auto;
  > ol{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 200px;
    overflow: auto;
    > li{
      font-size: 1.2em;
      text-align: center;
      display: block;
      width: 20%;
      margin-left: 4%; 
      padding: 8px 0 8px 0;
      border-radius: 8px;
      word-break: break-all;
      user-select: none;
      &.add{
        border: none;
      }
      &.selected{
        background-color: #dcdcdc; 
      }
    }
  }
`
const Tags:React.FC = () => {
  const [tags, setTags] = useState<{value: string,id: number}[]>([{value:'衣',id:1},{value:'食',id: 2},{value:'住',id: 3},{value:'行',id: 4}])
  const [selectedList, setSelectedList] = useState<number[]>([])
  const triggerTag = (id: number) => {
    const index = selectedList.findIndex(item => id === item)
    if (index > -1){
      const newSelectedList = [...selectedList]
      newSelectedList.splice(index,1)
      setSelectedList(newSelectedList)
    }else {
      setSelectedList([...selectedList,id])
    }
  }
  return (
    <Wrapper>
      <ol>
        {tags.map((item) => <li key={item.id} onClick={() => triggerTag(item.id)} className={selectedList.find(id => id === item.id) !== undefined ? 'selected': ''}>{item.value}</li>)}
        <li className='add'><Icon name='addTags'/></li>
      </ol>
    </Wrapper>
  )
}
export {Tags}