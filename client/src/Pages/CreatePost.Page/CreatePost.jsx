import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import Select from 'react-select'
import { useHistory } from 'react-router'
import { AuthContext } from '../../State/AuthContext'

const CreatePost = () => {
  const {loggedIn} = useContext(AuthContext)

  const history = useHistory()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [flair, setFlair] = useState('General')

  const flairOptions = [
    {value: "Tech", label: "Tech"},
    {value: "Finance", label: "Finance"},
    {value: "Hardware & Semiconductor", label: "Hardware & Semiconductor"},
    {value: "E-Commerce & Retail", label: "E-Commerce & Retail"},
    {value: "Gaming", label: "Gaming"},
    {value: "Auto", label: "Auto"},
    {value: "Media & Entertainment", label: "Media & Entertainment"},
    {value: "Telecom", label: "Telecom"},
    {value: "Health", label: "Health"},
    {value: "Aviation", label: "Aviation"},
    {value:"General" , label: "General"},
    {value:"Software Engineering" , label: "Software Engineering"},
    {value:"Product Management" , label: "Product Management"},
    {value:"Information Technology" , label: "Information Technology"},
    {value:"Data Science & Analytics" , label: "Data Science & Analytics"},
    {value: "Management Consulting" , label:  "Management Consulting"},
    {value:"Design" , label:"Design"},
    {value:"Sales" , label: "Sales"},
    {value:"Security" , label: "Security"},
    {value:"Investment Banking & Sell Side" , label: "Investment Banking & Sell Side"},
    {value: "Marketing" , label:  "Marketing"},
    {value:"Private Equity & Buy Side" , label: "Private Equity & Buy Side"},
    {value:"Corporate Finance" , label: "Corporate Finance"},
    {value:"Supply Chain" , label: "Supply Chain"},
    {value:"Human Resources" , label: "Human Resources"},
    {value:"Operations" , label: "Operations"},
    {value:"Legal" , label: "Legal"},
    {value:"Engineering" , label: "Engineering"},
    {value:"Admin" , label: "Admin"},
    {value:"Customer Service" , label: "Customer Service"},
    {value:"Communications" , label: "Communications"},
    {value:"Return to Office" , label: "Engineering"},
    {value:"Work From Home" , label: "Work From Home"},
    {value:"COVID-19" , label: "COVID-19"},
    {value:"Layoffs" , label: "Layoffs"},
    {value:"Investments & Money" , label: "Investments & Money"},
    {value:"Work Visa" , label: "Engineering"},
    {value:"Housing" , label: "Housing"},
    {value:"Startups" , label: "Startups"},
    {value:"Referrals" , label: "Referrals"},
    {value:"Health Care & Insurance" , label: "Health Care & Insurance"},
    {value:"Blockchain & Crypto" , label: "Layoffs"},
    {value:"Travel" , label: "Travel"},
    {value:"Tax" , label: "Tax"},
    {value:"Hobbies & Entertainment" , label: "Hobbies & Entertainment"},
    {value:"IPO" , label: "IPO"},
    {value:"Working Parents" , label: "Working Parents"},
    {value:"Side Jobs" , label: "Side Jobs"},
    {value:"Food & Dining" , label: "Food & Dining"}]

    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        width: '100%',
        backgroundColor: "white",
        color: state.selectProps.menuColor,
        padding: 20,
      }),

      option: (styles) => {
        return {
          ...styles,
          width: "100%",
          color: 'black',
        };
      },

      indicatorsContainer: () => (
        {
          display: "flex",
          margin: "0"
        }
      ),

      valueContainer: () => (
        {
          padding: 0,
          
        }
      ),

    
      control: (_, { selectProps: { width="100%" }}) => ({
        width: "100%",
        display: "flex",
        backgroundColor: "transparent",
        // border: "solid gray",
        borderRadius: "0.375rem",
        color: "white"
      }),
    
      singleValue: (provided, state) => {
        const width = "100%";
        const transition = 'opacity 300ms';
        const backgroundColor = "#00AE81";
        const color = "white"
        const height= "100%"
        const display = "flex"
        const justifyContent = "center"
        const placeItems= "center"
        const borderRadius= "0.375rem";
        const paddingLeft = "0.5rem"
        // const paddingRight = "0.5rem"
    
        return { ...provided, color ,width, transition, backgroundColor, height, display, justifyContent, placeItems, borderRadius, paddingLeft};
      },
    }

    //will reroute user to previous page if he/she is not signed in
    useEffect(() => {
      if(!loggedIn) {
        history.push('/login')
      }
    })
    
    const addPost = async(e) => {
      e.preventDefault()
      try {
        const { data } = await axios.post('http://localhost:5000/api/posts/create', 
          {
            title, body, flair
          }, 
          {withCredentials: true}
        )
        console.log(flair)
        history.push(`/post/${data.postID}`)
      } catch(err) {

      }
    }

  return (
    <section className="dark:bg-dark-primary  transition-all flex justify-center items-center font-noto duration-500 w-full min-h-screen h-full bg-white-bg">
      <div className="w-11/12 m-auto dark:bg-dark-post bg-white duration-500 transition-all py-8 px-4 rounded-md">
        <form onSubmit={addPost} className="flex w-full pt-4 flex-col pb-5 dark:border-dark-flair ">
          <div className="flex flex-col text-left">
              <label  className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Title*</label>
              <input value={title} onChange={e => setTitle(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-10 bg-transparent dark:border-gray-700 hover:ring-green-flair border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
          </div>
          <div className="flex flex-col text-left my-2">
            <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Flair*</label>
            <Select onChange={val => setFlair(val.value)} defaultValue={flairOptions[0]} styles={customStyles} options={flairOptions} />
          </div>
          <div className="flex w-full flex-col mt-3 mb-2 text-left">
            <label className="text-sm dark:text-gray-300 text-gray-700 font-bold pl-4 pb-1">Body*</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-56 bg-transparent dark:border-gray-700 hover:ring-green-flair resize-y border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
          </div>
          <button type="submit" className=" focus:outline-none w-full mt-2 bg-green-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost