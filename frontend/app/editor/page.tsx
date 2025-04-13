"use client";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import { useState } from "react";

export default function Editor() {
    const [language, setLanguage] = useState("c_cpp");
    const [code, setCode] = useState("// Start coding here\n");

    return (
        <div className="min-h-screen pt-20 pb-8 px-4 max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-fade-in">Code Editor</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
                    >
                        <option value="c_cpp">C++</option>
                        <option value="python">Python</option>
                    </select>
                    <button className="gradient-btn">Run (Coming Soon)</button>
                </div>
                <AceEditor
                    mode={language}
                    theme="monokai"
                    value={code}
                    onChange={setCode}
                    name="code-editor"
                    editorProps={{ $blockScrolling: true }}
                    className="w-full h-[500px] rounded-lg border dark:border-gray-700"
                />
            </div>
        </div>
    );
}