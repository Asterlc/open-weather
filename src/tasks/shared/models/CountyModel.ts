import * as mongoose from 'mongoose';

export const CountySchema = new mongoose.Schema({
  codeIBGE: Number,
  countyName: String,
  latitude: Number,
  longitude: Number,
  capital: Number,
  stateCode: Number,
  siafi_id: Number,
  ddd: Number,
  timezone: String,
})
