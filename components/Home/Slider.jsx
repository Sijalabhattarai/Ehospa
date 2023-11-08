import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const Slider = () => {
    return (
        <Swiper
            spaceBetween={50}
            className='overflow-hidden h-full'
            slidesPerView={1}
            autoplay={{ delay: 1000 }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide className='w-screen flex justif-center items-center' style={{ backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: 'cover', background: 'url(https://i.ibb.co/2sDRYv8/slide1.jpg)' }}>
                <div className="hero-content h-screen text-center text-neutral-content">
                    <div className="max-w-md animateUp">
                        <h1 className="mb-5 text-5xl text-white font-bold">Appoint on Fingertip</h1>
                        <p className="mb-5 text-white">
                            Book your appointment with your doctor on your fingertip.
                        </p>
                        <button className="bg-blue-800 p-2 px-5 hover:bg-blue-600 rounded-full text-green">Learn More</button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className='w-screen flex justif-center items-center' style={{ backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: 'cover', background: 'url(https://i.ibb.co/crW7tDd/slide2.jpg)' }}>
                <div className="hero-content h-screen text-center text-neutral-content">
                    <div className="max-w-md animateUp">
                        <h1 className="mb-5 text-5xl text-white font-bold">Track Past Appointments</h1>
                        <p className="mb-5 text-white">
                            Track your past appointments with your doctor.
                        </p>
                        <button className="bg-blue-800 p-2 px-5 hover:bg-blue-600 rounded-full text-green">Learn More</button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className='w-screen flex justif-center items-center' style={{ backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: 'cover', background: 'url(https://i.ibb.co/yBrRf4M/slider3.jpg)' }}>
                <div className="hero-content h-screen text-center text-neutral-content">
                    <div className="max-w-md animateUp">
                        <h1 className="mb-5 text-5xl text-white font-bold">With Advance AI to assist you</h1>
                        <p className="mb-5 text-white">
                            Get assistance from our AI assistant to book your appointment.
                        </p>
                        <button className="bg-blue-800 p-2 px-5 hover:bg-blue-600 rounded-full text-green">Learn More</button>
                    </div>
                </div>
            </SwiperSlide>

        </Swiper>
    );
};

export default Slider;