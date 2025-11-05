---
layout: default
title: Case Study
client_name: U.S. Citizenship and Immigration Services
customer_logo_url: USCIS_logo.svg
customer_logo_alt: USCIS logo
---

{% capture customer_background_text %}
  USCIS (United States Citizenship and Immigration services) is the government agency that oversees lawful immigration to the United States. 
  
  Their mission includes adjudicating and granting employment, family and adoption-based benefits, humanitarian relief, as well as supporting refugees and asylum seekers.
{% endcapture %}

{% capture challenge_heading %}
  Supporting Vulnerable Asylum Seekers in Operation Allies Welcome
{% endcapture %}

{% capture challenge_text %}
  Upon the sudden military withdrawal from Afghanistan, USCIS was tasked to rapidly enroll and process Afghan interpreters and their families to ensure their safe departure, while maintaining national security requirements.

  In support of this operation, dubbed Operation Allies Welcome (OAW), we supported the creation of new processing centers being stood up at military bases in multiple foreign locations, so that USCIS could capture biometrics information in the field and begin vetting Afghan refugees and asylum seekers.
{% endcapture %}

<section class="container pt-4">
<img src="/img/{{page.customer_logo_url}}" alt="{{page.customer_logo_alt}}" class="mb-3" />
  {%- include component_title_grid.html
    left_icon_url=page.customer_logo_url
    left_icon_alt=page.customer_logo_alt
    left_title="Client"
    right_title=page.client_name
    right_text=customer_background_text
  -%}
</section>

<div class="pd-highlight">
    <section class="container py-2">
      {%- include component_title_grid.html
    left_title="Challenge"
    right_title=challenge_heading
    right_text=challenge_text
  -%}
    </section>
</div>

<section class="container">
  {%- include component_title_grid.html
    left_title="Approach"
  -%}
      <div class="row mx-auto">
        {%- include case_step_card.html 
            icon_path="img/art/design-icon.svg"
            icon_alt="icon with pencil and ruler"
            title="Product Design"
            text='Understand what users need to craft intuitive solutions via User Research, User Experience Design, Interaction/Interface Design, and Content Strategy.'
            corner="dkred" -%}
        {%- include case_step_card.html 
            icon_path="img/art/devsecops-icon.svg"
            icon_alt="icon with gear surrounded by cycle arrows"
            title="Product Development"
            text='Build & support software using modern practices in Application Development, DevSecOps & Cloud Engineering, Data Engineering, Data Science & Analytics.'
            corner="blue" -%}
        {%- include case_step_card.html 
            icon_path="img/art/development-icon.svg"
            icon_alt="icon with computer and code"
            title="Product Delivery"
            text='Align products and efforts to mission outcomes via agile product, project, and program management.'
            corner="orange" -%}
      </div>
</section>


### Our Approach

This involved collaborating with stakeholders to acquire and stage BET equipment, rename, update and configure the mobile units to be able to accept modified site codes and to handle manual entries to accommodate this very important effort for an initial estimated population of 2,500. This initial effort quickly ballooned to well over 50K and from one processing site to eight.

The largest challenge  the team faced was the deployment of new mobile kits in remote locations within a 30-day timeline. These kits had to be configured and deployed to eight designated to process the Afghan nationals.


USCIS (BDSO CPMS   teams) responded to a short-suspense  request to support intake and biometrics capture for thousands of incoming Afghan interpreters, family members and refugees. Through the media, coverage of the departure from Afghanistan was aired live, as USCIS began establishing the eight enrollment sites. USCIS was finding out on CNN with the rest of the world, and the planes were basically in the air.

The BDSO CPMS teams demonstrated flexibility and agility in completing the following initiatives in support:
•	Worked with personnel at each location with the configuration of additional workstations and BET mobile units.
•	Created reports and dashboards to present encounter totals 
o	Tableau  dashboards allows business stakeholders an on-demand view for understanding the processing events that occur at each site supporting the enrollment of the Afghan refugees.
o	The Splunk dashboards enable the CPMS and BET teams real-time data to monitor the processing times of records as they flow through the queues and across applications.
•	Collaborated with other enterprise teams and systems to with EGIS team to reduce processing times and the retrieval of FBI results 
•	Completed analysis and development efforts to integrate the BET application with new and existing peripheral hardware to provide more options for the rapid  deployment of workstations across the 8 sites within 30 days or less.


CPMS Operations teams provided weekend coverage by providing ad-hoc reports, monitoring of records and database activities, and engaging in support discussions for expedited processing. 


 
As a result of our efforts, USCIS was able to readily establish new remote enrollment sites to process  the 50K+ Afghan nationals, devise reporting mechanisms to keep USCIS site managers and executives   aligned with the progress being made and minimized the number of encounters required to collect all the required information and biographic data.


https://www.dhs.gov/allieswelcome 

