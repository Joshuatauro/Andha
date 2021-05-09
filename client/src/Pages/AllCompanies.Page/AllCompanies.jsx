import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CompanyCard from '../../Components/CompanyCard.Component/CompanyCard'

const AllCompanies = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {

    const getCompanies = async() => {
      const { data } = await axios.get('http://localhost:5000/api/companies', { withCredentials: true })
      setCompanies(data.companies)
      console.log(data)
    }
    getCompanies()
  }, [])

  return (
    <section className="dark:bg-dark-primary transition-all font-noto duration-500 w-full min-h-screen h-full bg-white-bg">
      <div className="w-11/12 m-auto py-8 ">
        <h1 className=" dark:text-white font-black text-left text-3xl">Top companies</h1>
        <p className="dark:text-gray-400 text-gray-700 flex justify-start text-md whitespace-pre-wrap  text-left">Check out some of the top companies to work for considering many factors like competitive salaries, good WLB(work-life balance)</p>
      
      <div className="py-4">
        {
          companies.map(company => (
            <CompanyCard key={company.company_id} companyAbout={company.company_about} companyFounded={company.company_founded} companyIndustry={company.company_industry} companyID={company.company_id} companyLocation={company.company_location} companyRating={company.company_rating} companyName={company.company_name} companySize={company.company_size} companyWebsite={company.company_website} totalReviews={company.total_reviews}  />
            ))
          }
      </div>
      </div>
    </section>
  )
}

export default AllCompanies
