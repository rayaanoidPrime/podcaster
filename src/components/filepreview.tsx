import React from 'react'

interface FilePreviewProps{
    fileData : {
        fileList : File[]
    }
}

export const FilePreview : React.FC<FilePreviewProps> = ({fileData}) => {
    return (
        <div className='p-2'>
            <div className='flex flex-col items-center'>
                {fileData.fileList.map((f)=>{
                    return (
                        <ol>
                            <li key={f.lastModified} className="flex">
                                <div key={f.name} className="ml-1 text-white">
                                    {f.name}
                                </div>
                            </li>
                        </ol>
                    )
                })}
            </div>
        </div>
    )
}