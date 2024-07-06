import { Schema, model, models } from 'mongoose';

const QuizSchema = new Schema({
  hostId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Host ID is required!'],
    ref: 'User',
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required!'],
  },
  summary: {
    type: String,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required!'], 
  },
  totalQuestion: {
    type: Number,
    default: 0
  },
  positiveScore: {
    type: Number,
    required: [true, 'Score is required!'],
  },
  negativeScore: {
    type: Number,
    default: 0
  },
  startAt: {
    type: Date,
    required: [true, 'Start time is required!'],
  },
  quizDeadline: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  totalScore: {
    type: Number,
    default: 0
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

// QuizSchema.index({ _id: 1 });
// QuizSchema.index({ createdAt: 1 });
// QuizSchema.index({ updatedAt: 1 });
// QuizSchema.index({ startAt: 1 });

const Quiz = models.Quiz || model("Quiz", QuizSchema);

export default Quiz;
