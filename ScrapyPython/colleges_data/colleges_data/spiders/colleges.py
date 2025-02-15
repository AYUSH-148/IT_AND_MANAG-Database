import scrapy
import json

class CollegesSpider(scrapy.Spider):
    name = "colleges"
    allowed_domains = ["collegedekho.com"]
    start_urls = [
        "https://www.collegedekho.com/btech-artificial_intelligence_ai_and_machine_learning_ml-colleges-in-india/?page=7",
    ]
   
    def parse(self, response):
        # Extract college card details
        college_cards = response.css('.collegeCardBox')

        for card in college_cards:
            title = card.css('.titleSection > h3 > a::text').get().strip()
            img = card.css('.CollegeListingModal > img::attr(src)').get()
            url = card.css('.titleSection > h3 > a::attr(href)').get().strip()
            rate = card.css('.collegeRate > span::text').get()
            college_type = card.css('.info > li:nth-child(3)::text').get()
            location = card.css('.info > li:nth-child(2)::text').get().strip()
            fees = card.css('.fessSection > ul > li:nth-child(1) > p::text').get().strip()
            avg_pkg = card.css('.fessSection > ul > li:nth-child(3) > p::text').get()

            # Construct a dictionary for each college
            college_data = {
                'title': title,
                'url': response.urljoin(url),  # Make the URL absolute
                'avg_pkg': avg_pkg,
                'location': location,
                'img': img,
                'rate': rate,
                'type': college_type,
                'fees': fees,
                'description': ''
            }

            # Make a request to the college detail page and pass the college_data
            request = scrapy.Request(
                url=response.urljoin(url),
                callback=self.parse_college_details
            )
            request.meta['college_data'] = college_data
            yield request

    def parse_college_details(self, response):
        # Retrieve the college_data dictionary
        college_data = response.meta['college_data']

        # Extract contact information
        contact_info = response.css('.contactLocationAddress_collegeAddress__lFOqq ul li::text').getall()
        college_data['contact'] = contact_info

        # Construct the courses URL
        course_info_url = college_data['url'] + "-courses"
        
        # Make a request to the courses page
        request = scrapy.Request(
            url=course_info_url,
            callback=self.parse_courses_description
        )
        request.meta['college_data'] = college_data
        yield request

    def parse_courses_description(self, response):
        # Retrieve the college_data dictionary
        college_data = response.meta['college_data']

        # Extract course details
        course_cards = response.css('.courseAndDegreeCardItems_courseCardBox__etYmH')

        courses = []
        for card in course_cards:
            # Extract course name
            course_name = card.css('.courseAndDegreeCardItems_cardHeading__R501_ > h3 > a::text').get()
            if not course_name:
                course_name = card.css('.courseAndDegreeCardItems_cardHeading__R501_ > h3::text').get()
            
            # Extract exam accepted (hover tip and expand)
            exam_accepted = card.css('.courseAndDegreeCardItems_hoverTip__jx4bq::text').get()

            # Extract number of courses
            num_courses = card.css('.courseAndDegreeCardItems_detailsBlock__A6Dfs > div:nth-child(3) > span::text').get()

            # Extract available sub-courses
            sub_courses = card.css('.courseAndDegreeCardItems_cardChips__j13_h > ul > li::text').getall()
            if not sub_courses:
                sub_courses = card.css('.courseAndDegreeCardItems_cardChips__j13_h > ul > li > a::text').getall()
            

            fees_yearly = card.css('.courseAndDegreeCardItems_detailsBlock__A6Dfs > div:nth-child(1) > span.courseAndDegreeCardItems_detailBold__a2Pm7::text').getall()
            
            # Construct course data dictionary
            course_data = {
                'name': course_name,
                'fees_yearly': fees_yearly,
                'exam_accepted': exam_accepted,
                'num_courses': len(sub_courses),
                'avail_sub_courses': sub_courses
            }

            courses.append(course_data)

        # Add courses to college_data
        college_data['courses'] = courses

        # Extract description
        description = response.css('.collegeDetail_overview__Qr159::text').get()
        if not description:
            description = response.css('.collegeDetail_overview__Qr159 > p::text').get()
        if description:
            college_data['description'] = description.strip()

        # Print the combined data
        self.logger.info(f"Complete extracted data: {json.dumps(college_data, indent=2)}")

        yield college_data
