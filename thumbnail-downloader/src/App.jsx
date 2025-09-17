import React, { useState } from 'react'
import getVideoId from 'get-video-id';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const urlModel = [
    {
      width: 120,
      height: 90,
      url: 'https://img.youtube.com/vi',
      fileName: 'default.jpg'
    },
    {
      width: 320,
      height: 180,
      url: 'https://img.youtube.com/vi',
      fileName: 'mqdefault.jpg'
    },
    {
      width: 480,
      height: 360,
      url: 'https://img.youtube.com/vi',
      fileName: 'hqdefault.jpg'
    },
    {
      width: 640,
      height: 480,
      url: 'https://img.youtube.com/vi',
      fileName: 'sddefault.jpg'
    },
    {
      width: 1280,
      height: 720,
      url: 'https://img.youtube.com/vi',
      fileName: 'maxresdefault.jpg'
    }
  ]
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState([]);
  const fetchUrl = (e) => {
    e.preventDefault();
    const videoId = getVideoId(url);
    if (videoId.id) {
      const model = urlModel.map((item) => {
        return { ...item, url: `${item.url}/${videoId.id}/${item.fileName}` }
      })
      setThumbnail(model);
    } else {
      toast.error("Invalid Video URL")
    }
  }
  return (
    <div className='min-h-screen bg-gray-200 py-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Youtube Video Thumbnail Downloader</h1>
        <form className='space-x-4 mt-8' onSubmit={fetchUrl}>
          <input className='bg-white p-3 rounded-lg w-[450px]' required placeholder='Enter video url' type='url' onChange={(e) => setUrl(e.target.value)} />
          <button className='py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium cursor-pointer' >Search</button>
        </form>
      </div>
      <div className='mt-12 grid grid-cols-3 gap-12 w-10/12 mx-auto'>
        {
          thumbnail.map((item, idx) => (
            <div key={idx} className='bg-white h-[250px] w-[250px] p-2 rounded-lg flex items-center flex-col'>
              <div className='w-[90%] h-[80%] mt-2 flex items-center justify-center'>
                <img src={item.url} />
              </div>
              <div className='mt-4 w-full flex justify-between items-center px-4'>
                <p className='font-medium'>{item.width}x{item.height}</p>
                <a href={item.url} target='_blank'>
                  <button className='p-2 rounded-lg bg-indigo-600 text-white text-[12px] font-medium cursor-pointer' >Download</button>
                </a>
              </div>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default App