import { Comment } from '../types/types';
import { nanoid } from 'nanoid';

const comments: Comment[] = [];
for (let i = 0; i < 3; i++) {
  comments.push({
    id: nanoid(),//TODO type number after test
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2022-11-11',
    rating: 3.5,
    user: {
      id: nanoid(),//TODO type number after test
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
      name: 'Angelina',
    },
  });
}

export { comments };
