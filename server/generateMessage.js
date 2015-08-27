import fs from 'fs';
import markovCreator from 'markov';
import random from 'lodash/number/random';
import photos from './photos';

// names generated by chance.js
const users = [
  {avatar: "marc", name: "Marc Stone"},
  {avatar: "ellen", name: "Ellen Clayton"},
  {avatar: "ruth", name: "Ruth Maxwell"},
  {avatar: "ray", name: "Ray Scott"},
  {avatar: "sam", name: "Sam Munoz"},
  {avatar: "craig", name: "Craig Robbins"},
  {avatar: "lillie", name: "Lillie Wolfe"}
];

const markov = markovCreator(3);
export const generateReady = new Promise(resolve => {
  markov.seed(fs.createReadStream(__dirname + '/seed.txt'), resolve);
});

export function generateMessage() {
  const message = {};
  const user = users[Math.floor(Math.random() * users.length)];
  let image;

  if (Math.random() < 0.2) {
    image = photos[Math.floor(Math.random() * photos.length)];
  }

  message.avatar = user.avatar;
  message.name = user.name;
  message.time = new Date().toISOString();
  message.body = markov.fill(markov.pick(), random(3, 15)).join(' ');
  
  if (image) {
    message.mainImg = {
      farm: image.farm,
      id: image.id,
      secret: image.secret,
      server: image.server
    };
  }

  return message;
}