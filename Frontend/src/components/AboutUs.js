import React from 'react'

const AboutUs = () => {
    return (
        <div className=' py-6 mb-16 hidden xl:block'>
            <div className='container flex items-center justify-between '>
                <img src="https://imgs.search.brave.com/MgyL2QfqkKo0YmmE8yczZ1H7Rla0_LAiqMwFxtnSSxw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/OTc1NDIzOS9waG90/by91bml2ZXJzaXR5/LXN0dWRlbnQtaW4t/d2hpdGUtYmFja2dy/b3VuZC1zdG9jay1w/aG90by5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TGpGVkRm/anVzV0JqWVRObGlI/VjlEeVhmQXBQR2M4/RG1nQkdFdGZWZ1Ew/UT0" alt="" />
                <div className='bg-orange-200 h-full py-7'>
                    <h1 className='py-3 px-14 font-bold  text-5xl '><p className='py-3 border-b border-orange-300'>About Us</p></h1>
                    <p className='py-6 tracking-wide sm:px-14  font-semibold text-[16px] '>Welcome to our <strong>College Hub </strong>Web Application! We aim to provide an extensive and up-to-date database of <strong>IT and Management</strong> colleges across India. Our platform allows users to easily search and explore
                        detailed information about various colleges, including courses offered, eligibility criteria, fees, and more .
                        
                        Whether you are a student, parent, or education enthusiast, our goal is to help you make informed decisions about higher education opportunities in the IT and Management fields.</p>
                    <p className='text-right px-16 pb-2  font-semibold tracking-wide '><span className='border-b-2 border-orange-400 py-2'>Thank You !</span></p>
                </div>

            </div>
        </div>

    )
}

export default AboutUs
