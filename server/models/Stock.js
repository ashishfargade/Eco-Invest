import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
  },
  exchange: {
    type: String,
  },
  industry: {
    type: String,
  },
  logo: {
    type: String,
  },
  weburl: {
    type: String,
  },
  environment_grade: {
    type: String,
  },
  social_grade: {
    type: String,
  },
  governance_grade: {
    type: String,
  },
  environment_score: {
    type: Number,
  },
  social_score: {
    type: Number,
  },
  governance_score: {
    type: Number,
  },
  total_score: {
    type: Number,
  },
  last_processing_date: {
    type: Date,
  },
  total_grade: {
    type: String,
  },
  total_level: {
    type: String,
  },
}, { timestamps: true, collection: 'stockschemas' });

const Stock = mongoose.model('stockSchema', stockSchema);

export default Stock;