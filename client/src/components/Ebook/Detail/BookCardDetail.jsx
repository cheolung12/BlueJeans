import React from 'react';
import ImageCard from './ImageCard';
import ContentCard from './ContentCard';
export default function BookCardDetail({ data }) {
  const { thumbnail, title, author, id, description } = data;
  return (
    <div>
      <div>
        <div className='flex px-38 pb-11 justify-center'>
          <ImageCard
            id={id}
            thumbnail={thumbnail}
            title={title}
            author={author}
          />

          <ContentCard description={description} />
        </div>
      </div>
    </div>
  );
}
