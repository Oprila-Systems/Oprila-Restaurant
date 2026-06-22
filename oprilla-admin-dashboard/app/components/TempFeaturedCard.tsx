type FeaturedCardProps = {
  image: string;
  title: string;
  description: string;
  price: string;
};

export default function FeaturedCard({
  image,
  title,
  description,
  price,
}: FeaturedCardProps) {
  return (
    <div className="col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden flex h-[260px]">

      {/* Left Image */}
      <div className="w-[45%] relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-3 left-3 bg-[#7C3AED] text-white text-[10px] px-2 py-1 rounded">
          SIGNATURE
        </span>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-[20px] font-bold">
              {title}
            </h3>

            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-400 uppercase">
                ACTIVE
              </span>

              <button className="mt-1 w-9 h-5 rounded-full bg-blue-600 relative">
                <span className="absolute top-0.5 left-4 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
          </div>

          {/* Price */}
          <p className="mt-2 text-[#C2410C] font-bold text-lg">
            {price}
          </p>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-500 leading-6">
            {description}
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between items-center">
          <button className="bg-black text-white px-5 py-2 rounded-lg text-sm">
            Edit Details
          </button>

          <button className="w-8 h-8 border rounded-md text-gray-500">
            ⋯
          </button>
        </div>

      </div>
    </div>
  );
}