import React from 'react';
import ImageCard from './ImageCard';
import ContentCard from './ContentCard';
export default function BookCardDetail({
  id,
  title,
  thumbnail,
  author,
  publisher,
  genre,
  ISBN,
  description,
  heart,
  like,
}) {
  return (
    <div>
      <div>
        <div className='flex px-38 pb-11 justify-center max-[800px]:flex-col items-center'>
          <ImageCard
            id={id}
            thumbnail={thumbnail}
            title={title}
            author={author}
            publisher={publisher}
            genre={genre}
            ISBN={ISBN}
            heart={heart}
            like={like}
          />

          <ContentCard description={description} />
        </div>
      </div>
    </div>
  );
}
