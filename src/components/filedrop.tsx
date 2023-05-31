import React, { Dispatch, useReducer } from "react";
import { Heading } from "@chakra-ui/react";
import { FilePreview } from "./filepreview";
import { Action, State } from "~/pages/upload";

interface FileDropProps {
    data : State , 
    dispatch : Dispatch<Action>
}


const FileDrop : React.FC<FileDropProps>  = ({data , dispatch}) => {

    const handleDragEnter = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type : "SET_IN_DROP_ZONE",
            inDropZone : true,
            files : []
        })
    }

    const handleDragLeave = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            inDropZone : false ,
            type : "SET_IN_DROP_ZONE",
            files : []
        })
    }

    const handleDragOver = (e :  React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "copy";
        dispatch({
            inDropZone : true,
            type : "SET_IN_DROP_ZONE",
            files : []
        })

    }

    const handleDrop = (e:  React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files]
        if (files && files.length>0){
            
            const exisitingFiles = data.fileList.map((f)=>f.name);
            files = files.filter((f) => !exisitingFiles.includes(f.name))

            dispatch({
                files : files,
                type : "ADD_FILE_TO_LIST",
                inDropZone : false
            });

            dispatch({
                type : "SET_IN_DROP_ZONE",
                inDropZone : false,
                files : []
            });
        }

    }

    const handleFileSelect = (e : React.ChangeEvent<HTMLInputElement>) => {
        
        let files = [...(e.target.files as FileList)];

        if(files && files.length>0){

            const exisitingFiles = data.fileList.map((f)=>f.name);
            files = files.filter((f) => !exisitingFiles.includes(f.name));
            dispatch({
                type: "ADD_FILE_TO_LIST",
                files : files,
                inDropZone : false
            })

        }
    }

    return(
        <div className="flex flex-col h-full w-3/4 ">
            <h1 className="text-blue-300 font-semibold mt-auto mb-10 text-4xl">Drag And Drop</h1>
            <div className={`border-dashed items-center border-4 ${data.inDropZone === true ? "border-sky-800 opacity-100" : "border-gray-600 opacity-80"} rounded-lg p-4 h-96 mb-auto flex justify-center`}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragOver={(e)=> handleDragOver(e)}
                onDrop={(e) => handleDrop(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                >
                <div className="text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-12 w-12 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 15l4 4 4-4M8 9l4-4 4 4M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    </svg>
                    <label htmlFor="fileSelect" className="text-center border-1 bg-indigo-900 opacity-80 hover:opacity-100 px-3 rounded-xl hover:bg-indigo-600 text-white py-0.5 hover:cursor-pointer">You can select multiple Files</label>
                    <input id="fileSelect" onChange={(e) => handleFileSelect(e)} type="file" multiple className="border-0 clip-[rect(0 0 0 0)] h-1 overflow-hidden p-0 absolute top-[-9999px] whitespace-nowrap w-1" />
                    <p className="mt-1 text-sm text-gray-600">Drag and drop your files here</p>
                    <FilePreview fileData={data} />
                </div>
            </div>
        </div>
    )
}

export default FileDrop;