import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'
import { BiStar } from 'react-icons/bi'
import ReviewComponent from '../../Components/Review.Component/ReviewComponent'
import { toast, useToast } from '@chakra-ui/toast'

const CompanyDetails = () => {
  const toast = useToast()
  const history = useHistory()
  const { companyName } = useParams()


  const [pros, setPros] = useState('')
  const [cons, setCons] = useState('')
  const [title, setTitle] = useState(' ')
  const [position, setPosition] = useState(' ')
  const [rating, setRating] = useState(' ')
  

  const [companyDetails, setCompanyDetails] = useState({})
  const [reviews, setReviews] = useState([])

  const handleReviewSubmit = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/api/reviews/add`, 
      {
        pros,
        cons,
        title,
        rating, 
        companyName,
        position
      },
      {withCredentials: true}
      ) 
      if(data.reviewDetails){
        setReviews([data.reviewDetails, ...reviews])
        setPosition('')
        setPros('')
        setCons('')
        setTitle('')
        setRating('')
        toast(
          {
            description: "Successfully added review",
            duration: 4000,
            isClosable: true,
            position: "bottom-right",
            status: "success"
          }
        )
      }


    } catch(err){
      toast(
        {
          title: "Error",
          description: err.response.data.message,
          duration: null,
          isClosable: true,
          position: "bottom-right",
          status: "error"
        }
      )
    }
  }


  useEffect(() => {
    const getCompanyDetails = async() => {
      const { data } = await axios.get(`/api/companies/${companyName}`)
      if(data.companyDetails){
        setCompanyDetails(data.companyDetails)
        setReviews(data.reviews)
      } else {

        toast(
          {
            title: "No such company exists in our database",
            description: "You can write to us with relevant details at joshuatauro45@gmail.com",
            duration: null,
            isClosable: true,
            position: "bottom-right"
          }
        )
        history.goBack()
      }
      
    }
    getCompanyDetails()
  }, [])

  return (
    <section className='dark:bg-dark-primary font-noto w-full min-h-screen pt-7 pb-16 transition-all duration-500 bg-white-bg'>
      <div className="dark:bg-dark-post dark:text-white transition-all duration-500 w-11/12 bg-white m-auto h-full rounded-md ">
        <div className="pt-10 pb-5 w-11/12 m-auto">
          <div className="flex text-left">
            <img src={companyDetails.company_logo} alt="company logo" className="object-contain h-20" />
            <div className="flex flex-col ml-3">
              <h1 className="font-black text-3xl"> {companyDetails.company_name}</h1>
              <div className="flex items-center ">
                <BiStar className="text-gray-900 dark:text-white" />
                <p className="items-center pt-0.5 text-gray-700 dark:text-gray-400 text-sm">{Math.round(companyDetails.company_rating*10)/10} ({companyDetails.total_reviews} reviews)</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-left ">
            <h1 className="font-black text-2xl">About {companyDetails.company_name}</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-0 md:gap-x-12 w-full md:w-10/12 lg:w-7/12  ">
              <li className=" mt-2 grid grid-cols-2  grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Website</h2>
                <a href={companyDetails.company_website} target="_blank" rel="noreferrer" className="text-green-flair -ml-10" >{companyDetails.company_website}</a>
              </li>
              <li className=" mt-2 grid grid-cols-2 gap-x-0 grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Industry</h2>
                <h2 className="dark:text-white text-black -ml-10" >{companyDetails.company_industry}</h2>
              </li>
              <li className=" mt-2 grid grid-cols-2  grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Location</h2>
                <h2 className="dark:text-white text-black -ml-10" >{companyDetails.company_location}</h2>
              </li>
              <li className="mt-2 grid grid-cols-2  grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Founded</h2>
                <h2 className="dark:text-white text-black -ml-10" >{companyDetails.company_founded}</h2>
              </li>
              <li className=" mt-2 grid grid-cols-2  grid-rows-1 transition-all duration-500">
                <h2 className="dark:text-gray-400 text-gray-900 transition-all duration-500">Size</h2>
                <h2 className="dark:text-white text-black -ml-10" >{companyDetails.company_size}+ Employee's</h2>
              </li>
              
            </ul>
            <p className="mt-4">{companyDetails.company_about}</p>
          </div>
          
        </div>
      </div>
      <div className="dark:bg-dark-post dark:text-white transition-all duration-500 w-11/12 bg-white m-auto h-full rounded-md ">
        <div className="mt-8 pb-5 w-11/12 m-auto">
          <div className="pt-6 text-left">
            <h1 className="font-black text-2xl mb-2">Reviews</h1>
            <form onSubmit={handleReviewSubmit} className="flex w-full pt-4 flex-col pb-5 dark:border-dark-flair ">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
                <div className="flex w-full flex-col md:col-span-2">
                  <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Title*</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-10 bg-transparent dark:border-gray-700 hover:ring-green-flair border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Position*</label>
                  <input value={position} onChange={e => setPosition(e.target.value)} type="text" className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-10 bg-transparent dark:border-gray-700 hover:ring-green-flair border-gray-400 border rounded-lg outline-none focus:ring-2  focus:ring-green-flair" />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Rating*</label>
                  <input value={rating} onChange={e => setRating(e.target.value)} type="number" min="1" max="5" className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-10 bg-transparent dark:border-gray-700 hover:ring-green-flair border-gray-400 border rounded-lg outline-none focus:ring-2  focus:ring-green-flair" />
                </div>
              </div>
              <div className="flex w-full flex-col mt-2">
                <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Pros*</label>
                <textarea value={pros} onChange={e => setPros(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-36 bg-transparent dark:border-gray-700 hover:ring-green-flair resize-y border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
              </div>
              <div className="flex w-full flex-col mt-2 mb-2">
                <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Cons*</label>
                <textarea value={cons} onChange={e => setCons(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-36 bg-transparent dark:border-gray-700 hover:ring-green-flair resize-y border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
              </div>
              <button onSubmit={handleReviewSubmit} className=" focus:outline-none w-full mt-2 bg-green-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-11/12 m-auto">
      {
              reviews.map(review => (
                <ReviewComponent key={review.review_id} reviewCreatedAt={review.review_created_at} reviewTitle={review.review_title} reviewPros={review.review_pros} reviewCons={review.review_cons} reviewRating={review.review_rating} reviewUser={review.username} reviewUserPosition={review.user_position}/>
              ))
            }
      </div>
    </section>
  )
}

export default CompanyDetails
