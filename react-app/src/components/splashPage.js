import React, { useEffect, useState } from "react";
import { Link, useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
import { getAllBusinessesThunk } from "../store/business";

function Home(){
  console.log('HOME')
  return(
    <div>
      <h1>WELCOME TO HELP!</h1>
    </div>
  )
}
export default Home;
