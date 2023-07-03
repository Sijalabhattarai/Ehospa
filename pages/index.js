import React from 'react';
import Landing from '../components/Home/Landing';
import Timeline from '../components/Home/Timeline';
import Doctors from '../components/Home/Doctors';


const Home = () => {
  return (
    <div className='home'>
      {/* <div className='container'>
        <div className='left'>
          <img src="https://i.pinimg.com/originals/cf/d9/98/cfd9988c2826d5638ee5f88774e060cc.png" alt="" />
        </div>
        <div className='middle'>
          <h1 className='text1'>The Smart</h1>
          <p className='text2'>Hospital</p>
          <p className='text3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className='btn1'>BOOK A APPOINTMENT</button>
        </div>
        <div className='right'>
          <img src="https://i.pinimg.com/originals/cf/d9/98/cfd9988c2826d5638ee5f88774e060cc.png" alt="" />
        </div>
      </div> */}
      <Landing />
      <Timeline />
      <Doctors />
    </div>
  );
}

export default Home;