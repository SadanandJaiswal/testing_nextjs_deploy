import { Schema, model, models } from 'mongoose';
// import QuizQuestionSchema from './quizQuestion';

const TestSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Quiz ID is required!'],
    ref: 'Quiz',
    index: true
  },
  studentId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Student ID is required!'],
    ref: 'User',
    index: true
  },
  answers: [{
    quizQuestionId: {
      type: Schema.Types.ObjectId,
      ref: 'QuizQuestion',
      required: true
    },
    selectedAnswer: {
      type: [String],
      // required: true
    }
  }],
  correctAnswerArray: {
    type: [String],
    default: []
  },
  incorrectAnswerArray: {
    type: [String],
    default: []
  },
  unAnsweredArray: {
    type: [String],
    default: []
  },
  submittedAt: {
    type: Date,
  },
  score: {
    type: Number,
  },
  // Add more fields as needed, such as analytics or additional metadata
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

// Ensure indexes are created
TestSchema.index({ quizId: 1 });
TestSchema.index({ studentId: 1 });
TestSchema.index({ submittedAt: 1 });

const Test = models.Test || model("Test", TestSchema);

export default Test;
