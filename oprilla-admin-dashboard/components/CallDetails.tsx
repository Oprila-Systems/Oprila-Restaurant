export default function CallDetails() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        
        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            +1 (555)
            <br />
            012-4492
          </h1>

          <div className="flex gap-10 mt-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Date
              </p>
              <p className="mt-1 text-gray-800 font-medium">
                Oct 24, 2023
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Time
              </p>
              <p className="mt-1 text-gray-800 font-medium">
                12:45 PM
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Duration
              </p>
              <p className="mt-1 text-gray-800 font-medium">
                4m 32s
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end gap-5">
          <div className="bg-[#F4D1B2] text-[#9A4F1D] px-5 py-2 rounded-full text-sm font-semibold">
            TABLE BOOKED FOR 4
          </div>

          <div className="flex gap-4">
           <button className="border border-gray-300 bg-white px-8 py-4 rounded-xl font-bold text-lg text-gray-700 shadow-sm hover:shadow-md transition">
              Export Transcript
           </button>
             <button className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition">
                 Flag for Review
             </button>
             </div>
        </div>
      </div>
    </div>
  );
}