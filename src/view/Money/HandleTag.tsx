import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Toast} from 'antd-mobile';
import {Tag, Tags, useTags} from 'hooks/useTags';
import {CategoryType} from 'components/Category';

const Wrapper = styled.div`
  width: 80%;
  margin: 10px auto;
  font-size: 18px;
  user-select: none;

  > .input {
    padding: 20px;
  }

  > .button {
    display: flex;
    justify-content: space-around;
  }
`;

type Props = {
  type: string
  onChange: (value: boolean, updateTags: Tags) => void
  editValue: Tag,
  categoryType: CategoryType
}
const HandleTag: React.FC<Props> = (props) => {
  const {addTag, tags, removeTag, updateTag} = useTags();
  const count = useRef(0);
  let refInput = useRef<HTMLInputElement>(null);
  const cancel = () => {
    props.onChange(false, tags);
  };

  useEffect(() => {
    if (count.current > 1) {
      props.onChange(false, tags);
    }
    count.current += 1;
  }, [props, tags]);

  const add = () => {
    addTag((refInput.current as HTMLInputElement).value, props.categoryType);
    Toast.show('添加成功');
  };

  const remove = () => {
    removeTag(props.editValue.id);
    Toast.show('删除成功');
  };

  const update = () => {
    if (refInput.current) {
      if (refInput.current.value) {
        updateTag({id: props.editValue.id, name: refInput.current.value, type: props.categoryType});
        Toast.show('更新成功');
      } else {
        Toast.show('请输入至少一个字符！！！');
      }
    }
  };
  return (
    <>
      <Wrapper>
        <div className="input">
          <input type="text" placeholder="输入标签名" defaultValue={props.editValue.name} ref={refInput}/>
        </div>
        <div className="button">
          {props.type === 'add' ? <>
            <button onClick={cancel}>取消</button>
            <button onClick={add}>添加</button>
          </> : <>
            <button onClick={remove}>删除</button>
            <button onClick={update}>修改</button>
          </>}
        </div>
      </Wrapper>
    </>
  );
};
export {HandleTag};