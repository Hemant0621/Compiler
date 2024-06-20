import React, { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import languages from '../components/languages';
import axios from 'axios';

const Console = () => {
  const [code, setCode] = useState('// Write your code here\n');
  const [language, setLanguage] = useState('text/x-csrc');
  const [languagename, setlanguagename] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      location.href = '/signup'
    }else{
      result()
    }
    async function result() {
      const response = await axios.get('https://compiler-backend-ten.vercel.app/console/compile',{
        headers: {
        authorization: `Bearer ${localStorage.getItem("token")}` || ""
      }
      });
      
      setCode(response.data.message.code);
      setInput(response.data.message.input);
      setlanguagename(response.data.message.language)
    }

    
  },[])

  const handleLanguageClick = async (mode, name) => {
    setLanguage(mode);

    const options = {
      method: 'GET',
      url: 'https://online-code-compiler.p.rapidapi.com/v1/languages/',
      headers: {
        'x-rapidapi-key': 'e7563d52d0mshe3273d7bc376a98p14f4fcjsnef49df54a3de',
        'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options) || [];
      response.data.map((res) => {
        if (res.name == name) {
          setlanguagename(res.id)
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  const runCode = async () => {
    const response = await axios.post('https://compiler-backend-ten.vercel.app/console/compile',
      {
        language: languagename,
        code: code,
        input: input
      }, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    setOutput(response.data.message.output)
  };

  return (
    <div className="flex h-screen">
      {/* Language List */}
      <div className="w-1/6 bg-[#242424] p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
        <ul>
          {languages.map((lang) => (
            <li
              key={lang.name}
              className="p-2 hover:bg-white hover:text-[#242424] text-white rounded-md cursor-pointer transition-transform ease-linear hover:translate-x-4 duration-200"
              onClick={() => handleLanguageClick(lang.mode, lang.name)}
            >
              {lang.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Code Editor */}
      <div className="flex-1 p-4 ">
        <CodeEditor value={code} onChange={setCode} language={language} languagename={languagename}/>
      </div>

      {/* Input and Output Section */}
      <div className=" w-[25%] bg-[gray-200] h-full p-5 flex flex-col gap-10">
        {/* Input Section */}
        <div className='  w-auto'>
          <h2 className="text-lg font-semibold text-white">Input</h2>
          <textarea
            className="w-full h-64 p-6 mt-2 border bg-[#242424] text-white border-gray-300 rounded-xl resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Section */}
        <div className=' w-auto'>
          <h2 className="text-lg font-semibold text-white">Output</h2>
          <textarea
            className="w-full h-64 p-6 mt-2 border bg-[#242424] text-white border-gray-300 rounded-xl resize-none"
            value={output}
            readOnly
          />
        </div>

        {/* Run Code Button */}
        <button
          className="mt-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={runCode}
        >
          Run Code
        </button>
      </div>
    </div>
  );
};

export default Console;
