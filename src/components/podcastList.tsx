import React from "react";


interface podcastListProps {
    podcasts : String[],

}

export const PodcastList: React.FC<podcastListProps> = ({podcasts}) => {

   return (
    <div className="flex gap-4 max-w-full overflow-auto scrollbar-hide">
        {
            podcasts.map((podcast , index) => (
                <div className="
                    hover:bg-gray-600 rounded-lg bg-violet-900 shadow-xl text-gray-400 py-20 px-40
                    ">{podcast}
                </div>
            ))
        }
    </div>
   )
}