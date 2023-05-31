import React, { useReducer } from "react";
import { Layout } from "~/components/layout";
import {useForm , SubmitHandler} from "react-hook-form";
import FileDrop from "~/components/filedrop";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Box,
    Flex,
} from '@chakra-ui/react'
import { signIn, useSession } from "next-auth/react";

interface IFormInput {
    podcastname : String,
    file : File,
    epNumber : Number,
    epName : String
}

export type Action = {
    type : "SET_IN_DROP_ZONE" | "ADD_FILE_TO_LIST",
    inDropZone : boolean,
    files : File[]
}

export type State = {
    fileList : File[]
    inDropZone : boolean
}

export default function upload(){

    const reducer = (state : State , action : Action) => {
        switch (action.type) {
            case "SET_IN_DROP_ZONE" : 
                return {...state , inDropZone : action.inDropZone}
            case "ADD_FILE_TO_LIST" :
                return {...state, fileList : state.fileList.concat(action.files)}
            default : 
                return state;
        }
    }

    const [data , dispatch] = useReducer(reducer , {
        inDropZone : false,
        fileList : []
    });

    const { data: sessionData } = useSession();
    const { register, handleSubmit , formState: { errors }} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    return(
        <Layout>
            <div>
                <h1 className="text-4xl font-semibold text-indigo-300 text-left">Upload</h1>
            </div>
            <div className="flex justify-between gap-10 items-center ml-20 h-screen">
                <FormControl>
                    <form className="flex flex-col text-white" onSubmit={handleSubmit(onSubmit)}>
                        <FormLabel htmlFor='podcastname' fontSize={"3xl"} className="text-blue-300 ">Title</FormLabel>
                        <Input
                            id="podcastname"
                            placeholder="Enter podcast title..."
                            size="md"
                            variant="flushed"
                            type="text" 
                            {...register("podcastname" , 
                                {required : "A Podcast Name is required"})} 
                        />
                        <FormLabel htmlFor='epName' fontSize={"3xl"} className="text-blue-300 mt-10">Episode name</FormLabel>
                        <Input 
                            id="epName"
                            placeholder="Enter episode title..."
                            type="text" 
                            size="md"
                            variant="flushed" 
                            {...register("epName" , 
                                {required : true})} 
                        />
                        <FormLabel htmlFor='epNumber' fontSize={"3xl"} className="text-blue-300 mt-10">Episode #</FormLabel>
                        <Input 
                            id="epNumber"
                            placeholder="Enter episode number..."
                            type="Number" 
                            size="md"
                            variant="flushed"
                            {...register("epNumber" , 
                                { required : true})} 
                        />

                        {sessionData ? <></> : <div className="opacity-70 text-white-400 mt-10 ml-auto px-2 mb-4 rounded-xl border-2 border-rose-900  w-fit">Please Login to submit!</div>}

                        <Button 
                            type="submit" 
                            onClick={sessionData ? () => handleSubmit(onSubmit) :
                                () => void signIn()} 
                            className="w-fit ml-auto text-black">
                           {sessionData ? "Submit" : "Login"}
                        </Button>
                    </form>
                </FormControl>
                <FileDrop data={data} dispatch={dispatch} />
            </div>
        </Layout>
    )
    
}
