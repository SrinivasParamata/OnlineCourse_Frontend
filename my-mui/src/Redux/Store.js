import { configureStore } from "@reduxjs/toolkit";
import CreateStore from './ReduxTlkit';



export const ReduxToolKitStore= configureStore({
    reducer:{
      Course: CreateStore.reducer
    } ,
  });
  