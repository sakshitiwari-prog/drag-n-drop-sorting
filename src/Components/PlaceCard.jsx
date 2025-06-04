import { FaMapMarkerAlt, FaLink, FaTrash, FaStar } from "react-icons/fa";

const PlaceCard = ({ place }) => {
  return (
    <div className="flex flex-col ">
      <div className="relative flex w-full items-start bg-white rounded-lg p-6 space-x-4 hover:shadow-lg transition">

        {/* Drag Handle */}
        <div className="relative">
          <div className="absolute top-10 -left-5 flex flex-col justify-center items-center pr-2">
            <div className="w-[15px] h-[1.5px] bg-gray-500 rounded-full mb-1 " />
            <div className="w-[15px] h-[1.5px] bg-gray-500 rounded-full " />
          </div>
        </div>
        {/* Image with Balloon Badge */}
        <div className="relative shrink-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-24 h-24 rounded-xl object-cover"
          />

          {/* Balloon Marker */}
          <div className="absolute -left-3 top-4 flex flex-col items-center">
            <div className="bg-[#C64DFF] text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-md">
              {place.id}
            </div>
            <div
              className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[10px] border-t-[#C64DFF] -mt-[3.7px]"
            ></div>
          </div>
        </div>

        {/* Card Details */}
        <div className="flex-grow space-y-1">
          <div className="flex pl-2 justify-between">
            <h3 className="text-lg font-semibold">{place.name}</h3>
            <div className="flex items-center gap-3">
              <a href={place.mapLink} target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt className="text-blue-500 hover:text-blue-700" />
              </a>
              <a className="hidden md:block" href={place.link} target="_blank" rel="noopener noreferrer">
                <FaLink className="text-gray-600 hover:text-gray-800" />
              </a>
              <button className="hidden md:block">
                <FaTrash className="text-red-500 hover:text-red-700" />
              </button>
              <div className="flex flex-col md:hidden justify-center items-center pl-[10px] md:hidden">
                <div className="w-[3px] h-[3px] rounded bg-gray-500 rounded-full mb-[2px]" />
                <div className="w-[3px] h-[3px] rounded bg-gray-500 rounded-full mb-[2px]" />
                <div className="w-[3px] h-[3px] rounded bg-gray-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center pl-2 gap-[1.5] text-sm text-gray-600">
            <span className="text-[#6C757D] flex items-center">
              {place.rating}
              <FaStar className="ml-2 text-yellow-500" />
            </span>
            <span className="ml-2 text-[#6C757D]">({place.reviews.toLocaleString()})</span>
          </div>

          <div className="text-sm bg-[#F8F9FA] md:block hidden p-2 rounded-lg text-gray-700 relative">
  <span className="block text-start w-[95%] break-words">
    {place.description}
  </span>

  {/* Edit Icon at Top-Right */}
  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-[20px] transform scale-x-[-1]">
    ✎
  </button>
</div>

        </div>

      </div>
      <div className="text-sm bg-[#F8F9FA] ml-[40px] md:ml-0 md:hidden p-2 rounded-lg text-gray-700 flex justify-between items-center">
        <span className="text-start">{place.description}</span>
        <button className="ml-2 text-gray-500 hover:text-gray-700 text-[20px] transform scale-x-[-1]">✎</button>
      </div>
    </div>

  );
};


export default PlaceCard;
