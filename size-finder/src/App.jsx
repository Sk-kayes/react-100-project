import { ArrowBigRight, Plus } from 'lucide-react'
import { useState } from 'react';

const App = () => {
  const [src, setSrc] = useState("./vite.svg");
  const [inp, setInp] = useState({
    width: 0,
    height: 0
  });
  const [original, setOriginal] = useState({
    width: 0,
    height: 0
  });
  const [condition, setCondition] = useState(true);
  const [length, setLength] = useState({
    width: 0,
    height: 0
  })

  const chooseImage = () => {
    const input = document.createElement("input");
    input.type = "file",
      input.accept = "image/*",
      input.click(),
      input.onchange = () => {
        const file = input.files[0];
        const url = URL.createObjectURL(file);
        setSrc(url)
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setOriginal({
            width: img.width,
            height: img.height
          });
          setCondition(false)
        }
      }
  }

  const heightFinder = (e) => {
    e.preventDefault();
    const width = e.target[0].value;
    const height = Math.round((width * original.height) / original.width);
    setLength({ ...length, height: height });
    setInp({ ...inp, width: width })
  }

  const widthFinder = (e) => {
    e.preventDefault();
    const height = e.target[0].value;
    const width = Math.round((height * original.width) / original.height);
    setLength({ ...length, width: width });
    setInp({ ...inp, height: height })
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8">

        {/* Upload button */}
        <div className="flex justify-start">
          <button
            onClick={chooseImage}
            className="w-fit sm:w-auto bg-indigo-600 text-white font-medium px-4 py-3 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <Plus />
            <span className="hidden sm:inline">Add</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>

        {/* Image Preview */}
        <div className="bg-gray-800 py-6 flex justify-center rounded-md shadow-md">
          <img
            src={src}
            alt="preview"
            className="w-3/4 sm:w-1/3 md:w-1/5 rounded border border-gray-700 object-contain"
          />
        </div>

        {/* Forms Section */}
        <div className="bg-gray-800 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-md px-4 sm:px-6 shadow-md">
          {/* Height Finder */}
          <div className="flex flex-col">
            <h1 className="inline-block mb-4 bg-rose-500 text-white text-base sm:text-lg font-bold py-2 px-4 rounded-lg">
              Height Finder
            </h1>

            <form onSubmit={heightFinder} className="flex flex-col gap-3">
              <input
                required
                type="number"
                value={inp.width}
                onChange={(e) => setInp(prev => ({ ...prev, width: e.target.value }))}
                name="width"
                placeholder="Enter Width"
                className="border border-gray-600 bg-gray-900 text-gray-100 p-3 rounded w-full focus:ring-2 focus:ring-rose-500 outline-none"
                disabled={condition}
              />

              <button
                type="submit"
                className="w-full md:w-auto justify-center md:self-start bg-indigo-600 text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-500 transition-colors"
              >
                <ArrowBigRight />
                <span>Find</span>
              </button>
            </form>

            <h1 className="mt-4 text-lg sm:text-xl font-semibold">
              Height Suggestion: <span className="text-rose-400">{length.height}</span>
            </h1>
          </div>

          {/* Width Finder */}
          <div className="flex flex-col">
            <h1 className="inline-block mb-4 bg-emerald-600 text-white text-base sm:text-lg font-bold py-2 px-4 rounded-lg">
              Width Finder
            </h1>

            <form onSubmit={widthFinder} className="flex flex-col gap-3">
              <input
                required
                type="number"
                value={inp.height}
                onChange={(e) => setInp(prev => ({ ...prev, height: e.target.value }))}
                name="height"
                placeholder="Enter Height"
                className="border border-gray-600 bg-gray-900 text-gray-100 p-3 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
                disabled={condition}
              />

              <button
                type="submit"
                className="w-full md:w-auto justify-center md:self-start bg-indigo-600 text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-500 transition-colors"
              >
                <ArrowBigRight />
                <span>Find</span>
              </button>
            </form>

            <h1 className="mt-4 text-lg sm:text-xl font-semibold">
              Width Suggestion: <span className="text-emerald-400">{length.width}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App