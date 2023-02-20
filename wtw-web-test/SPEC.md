# Web Application Engineer - Technical Test

This technical test relates to the advertised [web application engineer role](https://careers.wtwco.com/job/17498338/mid-level-full-stack-web-app-or-data-engineers-glasgow-glasgow-gb/) at [WTW](https://www.wtwco.com) based in their Glasgow office. 


## Format

This is an "open book" short technical test, designed to be a couple of hours at most. It's meant to highlight your skills & experience
in designing & implementing a solution to the problem statement below. It does **NOT** need to be complete, perfectly designed, fully tested 
or production ready.


## Why am I being asked to do a test?

Your time is precious and you might be wondering why we ask candidates to undertake a short technical test. There are three main reasons:

1.  It helps confirm that a candidate actually possess some of the skills they mention on their CV. Unfortunately we've had candidates in the
    past where they do not possess the technical skills they claim to have. A short test helps filter out unsuitable candidates earlier in the process.

2.  It much more accurately reflects the work we do on a daily basis. Being asked in an interview to write algorithms on a white board or put 
    down code on a piece of paper with no reference material is not how we operate in real life.

3.  It helps candidates put their best foot forward. There are many good software engineers who don't perform at their best in an interview.


## Technical Direction

For this role, we would like the UI to be written in Typescript and the components implemented with React. The API may be written in Typescript 
or Python - whatever you would prefer and feel most productive in. You may use any other libraries/packages you find useful if they save you time.

The UI does not need to "look nice" - just demonstrate the functionality required. Presentation is not a concern for this test as long as it is usable.
Likewise, the chart can be really rough looking, as long as it is populated with the correct data.

All server processes can run locally, there is no requirement to host on a cloud service. We'd like to see a couple of examples of automated testing 
but we do NOT need full test coverage - just enough to illustrate the principals.

There is no need to implement any authentication, rate limiting or other security measures, we are interested in a small proof of concept that 
implements the relevant business logic.

In the next interview, we would expect to talk about the architecture, decisions you made, testing strategies, how you would deploy & scale this if 
this were to be used as a real production system. You may prepare a diagram or couple of paragraphs on these topics if you wish.


## Problem Statement

There are two datasets included in this repository with the following schemas:

**cities.csv**

column     | datatype  | description
---------- | --------  | -----------
id         | string    | Unique city identifier
name       | string    | Display name of this city
country    | string    | ISO 3166 alpha-2 country code in which this city is located
population | number    | Number of people living in this city as of last official census

**temperatures.csv**

column  | datatype  | description
------- | --------  | -----------
city_id | string    | Unique city identifier
date    | string    | ISO 8601 date for the day this reading relates to
temp    | number    | The average temperature (in degrees Celsius) experienced in this city


A mock UI template has been provided to help illustrate the functionality that needs to be implemented:

![Example UI](example.png)

1. An API should be written to serve the data required in JSON format
2. The application should display a list of all countries with data in the drop down and allow the user to pick one
3. A chart should be shown of the average, min & max temperatures over time for all readings recorded in that country
4. The city overview should show up the top 5 cities by population and the maximum temperature recorded in that city over all time

*Note: The UI does not need to look exactly like the above, this is just a rough illustration to exhibit the requested functionality*

The UI should also display some sort of appropriate feedback to the user whilst waiting on data loading from the API.
