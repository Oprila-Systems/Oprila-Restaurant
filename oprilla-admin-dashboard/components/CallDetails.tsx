export default function CallDetails() {
  return (
    <div className="bg-white p-8 border-b">

      {/* Top Section */}
      <div className="flex justify-between items-start">

        {/* Phone Number */}
        <div>
          <h1 className="text-5xl font-bold">
            +1 (555) 012-4492
          </h1>

          <div className="flex gap-8 mt-6 text-gray-500">

            <div>
              <p className="text-sm">Date</p>
              <p className="font-medium">
                Oct 24, 2023
              </p>
            </div>

            <div>
              <p className="text-sm">Time</p>
              <p className="font-medium">
                12:45 PM
              </p>
            </div>

            <div>
              <p className="text-sm">Duration</p>
              <p className="font-medium">
                4m 32s
              </p>
            </div>

          </div>
        </div>

        {/* Badge + Buttons */}
        <div className="flex flex-col items-end gap-4">

          <div className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
            Table Booked For 4
          </div>

          <div className="flex gap-4">

            <button className="border px-6 py-3 rounded-lg hover:bg-gray-100">
              Export Transcript
            </button>

            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
              Flag for Review
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}