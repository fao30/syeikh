import '../App.css';
import React, { useEffect, useRef, useState } from 'react';

function Auto() {
  const [dataState, setDataState] = useState(false);

  const ColoredLine = () => (
    <hr
        style={{
            color: 'red',
            backgroundColor: 'red',
            height: 5
        }}
    />
  );
  return (
    <>
      <div onClick={() => {
        dataState? setDataState(false): setDataState(true)
        }}>
        {dataState?(
          <>
            <div>
              <ColoredLine />
              <p class="text-center">
              Example using auto-cols-auto
              </p>
              <ColoredLine />
            </div>
            <div class="grid grid-flow-col auto-cols-auto">
              <div class="border">01</div>
              <div class="border">02</div>
              <div class="border">03</div>
            </div>
            <div class="mt-5">
              {` <div class="grid grid-flow-col auto-cols-auto">`}
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
              <div>
              {`</div>`}
            </div>
          </>
        ):(
          <>
            <div className='mt-4'>
              <ColoredLine />
              <p class="text-center">
              Example using auto-rows-auto
              </p>
              <ColoredLine />
            </div>
            <div class="grid grid-flow-row auto-rows-auto">
              <div class="border">01</div>
              <div class="border">02</div>
              <div class="border">03</div>
            </div>
            <div class="mt-5">
              {` <div class="grid grid-flow-col auto-rows-auto">`}
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
              <div>
              {`</div>`}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Auto;
