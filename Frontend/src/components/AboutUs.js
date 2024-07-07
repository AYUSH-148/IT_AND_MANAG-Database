import React from 'react'

const AboutUs = () => {
    return (
        <div className='container  mb-20 bg-skin-light rounded-bl-3xl rounded-tr-3xl font-serif'>
          
            <h1 className='py-6 sm:px-14 font-bold text-4xl sm:text-5xl '>About Us</h1>
            <p className='py-6 sm:px-10 text-[14px] sm:text-[16px]'>Welcome to our <strong>College Hub </strong>Web Application! We aim to provide an extensive and up-to-date database of <strong>IT and Management</strong> colleges across India. Our platform allows users to easily search and explore detailed information about various colleges, including courses offered, eligibility criteria, fees, and more.

                 Powered by data scraping from reliable sources like <strong><a  className='hover:underline' href="https://www.collegedekho.com/" target='_blank'>CollegeDekho.com</a>, Careers360,</strong> etc. our web application ensures accurate and comprehensive data. We are dedicated to delivering a seamless user experience with a focus on intuitive design, responsive layouts, and high performance.

                Whether you are a student, parent, or education enthusiast, our goal is to help you make informed decisions about higher education opportunities in the IT and Management fields. Thank you for visiting, and we hope you find our platform helpful in your academic journey.</p>
        </div>
    )
}

export default AboutUs
