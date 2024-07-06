import { Schema, model, models } from 'mongoose';

const QuizQuestionSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Quiz ID is required!'],
    ref: 'Quiz',
    index: true
  },
  type: {
    type: String,
    required: [true, 'Question type is required!'],
    enum: ['single', 'multiple', 'boolean', 'text', 'numerical'],
  },
  images:{
    type: [String]
  },
  // level: {
  //   type: String,
  //   // required: [true, 'Question level is required!'],
  //   enum: ['easy', 'medium', 'hard'],
  //   default: "easy"
  // },
  question_description: {
    type: String,
    required: [true, 'Question description is required!'],
  },
  options: {
    type: [String],
  },
  correctAnswer: {
    type: [String]
  }
});

const QuizQuestion = models.QuizQuestion || model("QuizQuestion", QuizQuestionSchema); 
// const QuizQuestion = model("QuizQuestion", QuizQuestionSchema); 

export default QuizQuestion;
