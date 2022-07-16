import '../App.css';
import React, { useEffect, useRef, useState } from 'react';


function BoxTemplate() {
  const [dataState, setDataState] = useState(false);

  let boxBox = [];
  for (var i = 0; i < 9; i++) {
    boxBox.push(
      <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
         Button {i + 1}
        </button>
      </div>
    );
  }
  
  return (
    <>
     <p class="text-center" onClick={() => {
        dataState? setDataState(false): setDataState(true)
      }}> CHANGE </p>
      {dataState?(
      <>
        <p class="text-center">
           Grid Rows
        </p>
        <div class="grid grid-rows-4 grid-flow-col gap-4">
          <div class="border">01</div>
          <div class="border">02</div>
          <div class="border">03</div>
          <div class="border">04</div>
          <div class="border">05</div>
          <div class="border">06</div>
          <div class="border">07</div>
        </div>
        <div>
          {`<div class="grid grid-rows-4 grid-flow-col gap-4">`}
          </div>
          <div class='ml-4'>
          {`<div class="border">01</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">02</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">03</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">04</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">05</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">06</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">07</div>`}
          </div>
          <div>
          {`</div>`}
        </div>
      </>
      ):(
      <>
       <p class="text-center">
           Grid Cols
        </p>
        <div class="grid grid-cols-4 gap-2"> 
          <div class="border">01</div>
          <div class="border">02</div>
          <div class="border">03</div>
          <div class="border">04</div>
          <div class="border">05</div>
          <div class="border">06</div>
          <div class="border">07</div>
        </div>
        <div>
          {`<div class="grid grid-cols-4 gap-2"> `}
          </div>
          <div class='ml-4'>
          {`<div class="border">01</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">02</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">03</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">04</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">05</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">06</div>`}
          </div>
          <div class='ml-4'>
          {`<div class="border">07</div>`}
          </div>
          <div>
          {`</div>`}
        </div>
      </>
      )}
    </>
  );
}

export default BoxTemplate;
