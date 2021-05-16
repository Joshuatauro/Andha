
const SkeletonSinglePost = () => (
  <div className="animate-pulse w-11/12 m-auto py-8">
    <div className=" bg-green-flair w-20 h-7 rounded-md"></div>
    <div className=" w-10/12 h-10 mt-2 mb-3 dark:bg-dark-flair bg-gray-400"></div>
    <div className="w-full h-56 dark:bg-dark-flair bg-gray-400"></div>
    <div className="flex mt-3 border-b-2 pb-5 dark:border-dark-flair border-gray-300">
      <div className="w-24 rounded-md h-8 mr-2 dark:bg-dark-flair bg-light-flair"></div>
      <div className="w-24 rounded-md h-8 mr-2 dark:bg-dark-flair bg-light-flair"></div>
      <div className="w-24 rounded-md h-8 mr-2 dark:bg-dark-flair bg-light-flair"></div>
    </div>

    <form className="flex w-full m-auto pt-4 flex-col border-b-2 pb-5 dark:border-dark-flair border-gray-300">
      <textarea disabled className="dark:text-white text-md w-full px-3 py-2 text-gray-700 h-36 bg-transparent dark:border-gray-700 border-gray-400 border-2 rounded-lg resize-y  outline-none " />
      <button className=" w-full mt-2 bg-green-flair py-2 cursor-not-allowed rounded-md duration-300 text-white hover:bg-opacity-90">Submit</button>
    </form>

    
  </div>
)

export default SkeletonSinglePost