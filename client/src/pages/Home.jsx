import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto bg-cover bg-center relative'
        style={{
          backgroundImage: 'url("../images/background-image.jpg")',
        }}
      >
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Explore Our  <span className='text-slate-500'>Courses</span>
          <br />
          your easy way to get the <span className='text-slate-500'>A+</span>
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Join the countless students who have excelled with our support.
          <br />
          A+School is the most trusted name in education.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>


      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <div className="card bg-white shadow-md rounded-md overflow-hidden">
          <div className="card-header p-4 bg-green-500">
            <h2 className="text-2xl  font-s  text-black flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" />
              </svg>
              Special Offers</h2>
            <h3>
              <span className="text-sm text-yellow-50">Unlock Knowledge at Unbeatable Prices.</span>
            </h3>
          </div>
          <div className="card-body p-4">
            <div className="flex flex-wrap gap-4">
              {offerListings && offerListings.length > 0 && (
                offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              )}
            </div>
          </div>
          <div className="card-footer p-4 bg-gray-100 flex justify-end">
          <div>
            <p className="text-sm text-blue-800 hover:underline">
              <Link to="/search?offer=true">Show more special offers</Link>
            </p>
          </div>
        </div>
        </div>
        {/* vip courses */}
        <div className="card bg-white shadow-md rounded-md overflow-hidden">
          <div className="card-header p-4 bg-amber-500">
            <h2 className="text-2xl font-semibold text-black flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>VIP Learning Experience 
            </h2>
            <h3>
              <span className="text-sm text-yellow-100">Elevate Your Education with Private Teacher Guidance.</span>
            </h3>
          </div>
          <div className="card-body p-4">
            <div className="flex flex-wrap gap-4">
              {saleListings && saleListings.length > 0 && (
                saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              )}
            </div>
          </div>
          <div className="card-footer p-4 bg-gray-100 flex justify-end">
            <div>
              <p className="text-sm text-blue-800 hover:underline">
                <Link to="/search?type=sale">Show more VIP courses</Link>
              </p>
            </div>
          </div>
        </div>
         {/* groupe courses */}
        <div className="card bg-white shadow-md rounded-md overflow-hidden">
          <div className="card-header p-4 bg-blue-500">
            <h2 className="text-2xl font-semibold text-black">Collaborative Learning Hub</h2>
            <h3>
              <span className="text-sm text-yellow-50">Join Forces in Group Courses.</span>
            </h3>
          </div>
          <div className="card-body p-4">
            <div className="flex flex-wrap gap-4">
              {rentListings && rentListings.length > 0 && (
                rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              )}
            </div>
          </div>
          <div className="card-footer p-4 bg-gray-100 flex justify-end">
            <div>
              <p className="text-sm text-blue-800 hover:underline">
                <Link to="/search?type=rent">Show more group courses</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
