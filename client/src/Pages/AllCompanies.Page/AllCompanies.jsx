import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import CompanyCard from '../../Components/CompanyCard.Component/CompanyCard'
import { useHistory } from 'react-router'

const AllCompanies = () => {
  const history = useHistory()


  const [companies, setCompanies] = useState([])
  const [companySearch, setCompanySearch] = useState('')

  useEffect(() => {
    const getCompanies = async() => {
      const { data } = await axios.get(`/api/companies`, { withCredentials: true })
      setCompanies(data.companies)
    }
    getCompanies()
  }, [])

  const findCompany = (e) => {
    e.preventDefault()
    history.push(`/companies/${companySearch}`)
  }

  return (
    <section className="dark:bg-dark-primary transition-all font-noto duration-500 w-full min-h-screen h-full bg-white-bg">
      <div className="w-11/12 m-auto py-8 ">
        <h1 className=" dark:text-white font-black text-left text-3xl">Top companies</h1>
        <p className="dark:text-gray-400 text-gray-700 flex justify-start text-md whitespace-pre-wrap  text-left">Check out some of the top companies to work for considering many factors like competitive salaries, good WLB(work-life balance)</p>

        <form onSubmit={findCompany} action="" className="pt-4 grid grid-cols-1 md:flex items-center">
          <input type="text" value={companySearch} onChange={e => setCompanySearch(e.target.value)} placeholder="Search your company" className="dark:text-white text-md flex-g px-3 py-2 text-gray-900 h-12 w-full bg-transparent dark:border-gray-700 hover:ring-green-flair resize-y border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-green-flair" />
          <button type="submit" className="focus:outline-none px-12 mt-2 md:mt-0 md:ml-2 h-12 bg-green-flair py-2 rounded-md duration-300 text-white hover:bg-opacity-90">Search</button>
        </form>
      <div className="py-4">
        {
          companies.map(company => (
            <CompanyCard key={company.company_id} companyAbout={company.company_about} companyImage={company.company_logo} companyFounded={company.company_founded} companyIndustry={company.company_industry} companyID={company.company_id} companyLocation={company.company_location} companyRating={company.company_rating} companyName={company.company_name} companySize={company.company_size} companyWebsite={company.company_website} totalReviews={company.total_reviews}  />
            ))
          }
      </div>
      </div>
    </section>
  )
}

export default AllCompanies
