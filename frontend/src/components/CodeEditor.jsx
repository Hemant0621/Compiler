import React, { useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';

// Import CodeMirror modes
import 'codemirror/mode/clike/clike'; // C, C++, C#, Java, Scala, etc.
import 'codemirror/mode/clojure/clojure';
import 'codemirror/mode/cobol/cobol';
import 'codemirror/mode/coffeescript/coffeescript';
import 'codemirror/mode/d/d';
import 'codemirror/mode/dart/dart';
import 'codemirror/mode/erlang/erlang';
import 'codemirror/mode/factor/factor';
import 'codemirror/mode/forth/forth';
import 'codemirror/mode/fortran/fortran';
import 'codemirror/mode/go/go';
import 'codemirror/mode/groovy/groovy';
import 'codemirror/mode/haskell/haskell';
import 'codemirror/mode/haxe/haxe';
import 'codemirror/mode/javascript/javascript'; // JavaScript, CoffeeScript
import 'codemirror/mode/lua/lua';
import 'codemirror/mode/mllike/mllike'; // OCaml, SML
import 'codemirror/mode/octave/octave';
import 'codemirror/mode/pascal/pascal';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python'; // Python 3
import 'codemirror/mode/r/r';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/scheme/scheme';
import 'codemirror/mode/shell/shell'; // Bash, Shell
import 'codemirror/mode/smalltalk/smalltalk';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/tcl/tcl';
import 'codemirror/mode/vb/vb'; // VB.Net
import 'codemirror/mode/verilog/verilog';

const CodeEditor = ({ value, onChange, language , languagename}) => {
  useEffect(() => {
    // Add any additional configuration or side effects here if needed
  }, [language]);

  return (
    <>
    <div className='flex justify-between'>
      <div className='p-2 bg-red-600 rounded-xl text-white m-3 w-40 transition-transform ease-linear hover:scale-110 cursor-pointer duration-200'>{languagename}</div>
      <div className='h-14 w-14 font-bold rounded-full justify-center items-center flex bg-red-600 text-white transition-transform ease-linear hover:scale-110 cursor-pointer duration-200' onClick={()=>{
        const logout = confirm("Are you Sure to Logout");
        if(logout){
          location.href='/signin'
        }
      }}> {localStorage.getItem('user')}</div>
    </div>
    <div className="h-full">
      <CodeMirror
        value={value}
        options={{
          mode: language,
          theme: 'material-darker',
          lineNumbers: true,
          tabSize: 2,
          indentUnit: 2,
        }}
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
      />
    </div>

    </>
  );
};

export default CodeEditor;
