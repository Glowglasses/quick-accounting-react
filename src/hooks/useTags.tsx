import {useEffect, useState} from 'react';
import {createId} from 'lib/createId';
import {useUpdate} from './useUpdate';

export type Tags = Tag[]
export type Tag = { id: number, name: string }
const useTags = () => {
  const [tags, setTags] = useState<Tags>([]);
  useEffect(() => {
    let localTags = JSON.parse(localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = [
        {id: createId(), name: '衣'},
        {id: createId(), name: '食'},
        {id: createId(), name: '住'},
        {id: createId(), name: '行'},
        {id: createId(),name: '工资'}
      ];
    }
    setTags(localTags);
  }, []);

  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags));
  }, tags);

  const addTag = (name: string) => {
    setTags([...tags, {name: name, id: createId()}]);
  };

  const updateTag = (tag: Tag) => {
    setTags(tags.map(item => item.id === tag.id ? {id: tag.id, name: tag.name} : item));
  };

  const removeTag = (id: number) => {
    setTags(tags.filter(item => item.id !== id));
  };

  return {addTag, updateTag, tags, setTags, removeTag};
};

export {useTags};
