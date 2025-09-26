import React, { useState } from 'react'
import { IoLanguageSharp } from "react-icons/io5";
import { RiFileCopyLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

const API_KEY = "AIzaSyB9ElThhNRHKlFHXDaP85gp-zYert3tOho";

const App = () => {

  const [form, setForm] = useState({
    text: '',
    lang: ''
  });

  const [result, setResult] = useState("Your translated result goes here...!!");
  const [loader, setLoader] = useState(false);

  const translateNow = async (e) => {
    e.preventDefault();
    if (form.text === "") {
      toast.error("Write something to translate");
      return;
    }
    if (form.lang === "" || form.lang === "Select a Language") {
      toast.error("Choose a Language");
      return;
    }
    try {
      setLoader(true);
      const payload = {
        contents: [{
          parts: [{
            text: `Translate into ${form.lang} (Translation as it is no any other data like hint description or any symbol) - ${form.text}`
          }]
        }]
      }

      const options = {
        headers: {
          'X-goog-api-key': API_KEY
        }
      }
      const { data } = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", payload, options);
      const ans = data.candidates[0].content.parts[0].text;
      setResult(ans);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  }
  const copyHandler = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied")
  }
  const handleChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setForm({
      ...form,
      [name]: value
    })
  }
  return (
    <div className='min-h-screen bg-slate-900 py-16'>
      <div className='w-10/12 grid grid-cols-2 gap-12 mx-auto'>
        <div className='p-8 bg-slate-800 border border-slate-700 border-2 rounded-xl'>
          <h1 className='text-4xl font-bold text-amber-500 mb-6'>
            Translator
          </h1>
          <form className='space-y-6' onSubmit={translateNow}>
            <textarea name='text' onChange={handleChange} placeholder='Your content goes here...' className='p-3 mb-6 text-white bg-slate-900 w-full rounded-xl focus:outline-none focus:border focus:border-amber-500 focus:border-2 resize-none placeholder-amber-50/50' rows={5}></textarea>
            <select required name='lang' onChange={handleChange} className='p-3 mb-6 text-white bg-slate-900 w-full rounded-xl focus:outline-none focus:border focus:border-amber-500 focus:border-2 resize-none placeholder-amber-50/50'>
              <option>Select a Language</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="bengali">Bengali</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
            {
              loader ? (
                <button disabled className='flex items-center gap-1 bg-gray-300 rounded-lg text-black py-3 px-6 font-medium focus:scale-95 duration-100'><AiOutlineLoading3Quarters className='animate-spin' />Translating</button>
              ) : (
                <button className='flex items-center gap-1 bg-amber-500 rounded-lg text-white py-3 px-6 font-medium focus:scale-95 duration-100 cursor-pointer'><IoLanguageSharp />Translate</button>
              )
            }
          </form>
        </div>
        <div className='relative p-8 bg-slate-800 border border-slate-700 border-2 rounded-xl'>
          <p className='mt-5 text-white/80'>{result}</p>
          <RiFileCopyLine className='absolute top-5 right-5 text-white hover:scale-95 duration-100 cursor-pointer' size={25} onClick={copyHandler} />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App