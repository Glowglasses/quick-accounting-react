import {useEffect, useState} from 'react';
import {createId} from 'lib/createId';
import {useUpdate} from './useUpdate';
import {CategoryType} from 'components/Category';

export type Tags = Tag[]
export type Tag = { id: number, name: string , type: string}
const useTags = () => {
  const [tags, setTags] = useState<Tags>([]);
  useEffect(() => {
    let localTags = JSON.parse(localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = [
        {id: createId(), name: '衣', type: '-'},
        {id: createId(), name: '食', type: '-'},
        {id: createId(), name: '住', type: '-'},
        {id: createId(), name: '行', type: '-'},
        {id: createId(),name: '工资', type: '+'}
      ];
    }
    setTags(localTags);
  }, []);

  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags));
  }, tags);

  const addTag = (name: string,categoryType: CategoryType) => {
    setTags([...tags, {name: name, id: createId(), type: categoryType}]);
  };

  const updateTag = (tag: Tag) => {
    setTags(tags.map(item => item.id === tag.id ? {id: tag.id, name: tag.name,type: tag.type} : item));
  };

  const removeTag = (id: number) => {
    setTags(tags.filter(item => item.id !== id));
  };

  return {addTag, updateTag, tags, setTags, removeTag};
};

export {useTags};
