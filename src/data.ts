import { Round } from './types';
import bear from './images/bear.png'
import japan from './images/japan.png'
import road from './images/road.png'
import school from './images/school.png'

export const surveyRounds: Round[] = [
  {
    imageUrl: bear,
    questions: [
      {
        id: 1,
        text: 'What color dress is the bear on the right side wearing?',
        options: ['Red', 'Yellow', 'Violet', 'Blue'],
        correctAnswer: 0,
      },
      {
        id: 2,
        text: 'Does both the umbrellas have the same color?',
        options: ['Yes', 'No'],
        correctAnswer: 0,
      },
      {
        id: 3,
        text: 'A house is there in the picture.',
        options: ['Yes, on the left side', 'Yes, on the right side', 'No, there is no house'],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: 'What is the color of the dress of the bear with its eyes closed?',
        options: ['Green', 'Red', 'Violet', 'Blue'],
        correctAnswer: 1,
      },
    ],
  },
  {
    imageUrl: japan,
    questions: [
      {
        id: 5,
        text: 'How many people are seen in the image?',
        options: ['3', '5', '7', '9'],
        correctAnswer: 1,
      },
      {
        id: 6,
        text: 'How many pastries are there on the table?',
        options: ['1', '2', '3', '0'],
        correctAnswer: 1,
      },
      {
        id: 7,
        text: 'Which of these are NOT something which was being done in the image?',
        options: ['Clicking a photo', 'Reading a newspaper', 'Watering the plants', 'Sipping Tea'],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: 'Which of these are visible in the image?',
        options: ['Ceiling Fan', 'Gas Stove', 'Coffee Machine', 'Plant Leaves'],
        correctAnswer: 2,
      },
      
    ],
  },
  {
    imageUrl: road,
    questions: [
      {
        id: 9,
        text: 'Is there a flight in the picture?',
        options:['Yes', 'No'],
        correctAnswer: 0,
      },
      {
        id: 10,
        text: 'Which animal is seen in the image?',
        options: ['A dog', 'A cat', 'A rabbit', 'A squirrel'],
        correctAnswer: 0,
      },
      {
        id: 11,
        text: 'How many bushes of trees are there in the picture?',
        options: ['3', '5', '7', '9'],
        correctAnswer: 1,
      },
      {
        id: 12,
        text: 'What is the color of the traffic signal?',
        options: ['Red', 'Yellow', 'Green'],
        correctAnswer: 0,
      },
      // ... similar structure for other questions
    ],
  },
  {
    imageUrl: school,
    questions: [
      {
        id: 13,
        text: 'How many kids are capped in the image?',
        options:['2', '3', '4', '5'],
        correctAnswer: 0,
      },
      {
        id: 14,
        text: 'All the kids carry food in their hands.',
        options: ['True', 'False'],
        correctAnswer: 0,
      },
      {
        id: 15,
        text: 'What color is the slide in the image?',
        options: ['Red', 'Dark Blue', 'Yellow', 'Green'],
        correctAnswer: 0,
      },
      {
        id: 16,
        text: 'Which color of shoe is NOT seen in the image?',
        options: ['Red', 'Yellow', 'Green', 'Blue'],
        correctAnswer: 0,
      },
      // ... similar structure for other questions
    ],
  },
  
];