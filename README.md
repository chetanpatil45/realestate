# Real-state application using Java

builted a real-estate full stack application using java, spring boot, and React.js

<a name="readme-top"></a>


# About The Project

### Project Scope

The real estate marketplace works as a mediator between homeowners and buyers/renters. Property owners can list their estate on the site,
set the approximate price, and find the customers. Customers, on the other hand, can search for a place, check property photos, building plans, and overall descriptions.

* Real estate agents can create accounts and advertise and sell there property
* Customer can view listed estates and can filter through this list of estate
* Customer must then be able to contact estate agent through that particular advert

## Project Design

### Architecture
System uses REST API Architecture. REST stands for Representational State Transfer Application Programming Interface, is a popular architectural 
style for designing networked applications. It allows different software systems to communicate with each other by 
exchanging data over the internet, typically using the HTTP protocol.

<img src="images/architecture.jpg" alt="architecture Diagram" >

This will architecture is scalable, flexible and lightweight and allows for other third party software, mobile, web written
in different languages to easily integrate with our services

### Endpoit Design
Below is a screenshot of the project restful api endpoints and the HTTP Method supported by each endpoint

<img src="images/realestate-endpoints-docs.png" alt="endpoints" >

### UML Diagram
Below is the UML design of the system including relationships between the difference objects that make up the system

<img src="images/realestate-uml.png" alt="UML Diagram" height="900">
The bottom diagram extends the one above and takes precedence in any data conflict
<img src="images/QUADRILATERAL INVESTMENT DEV UML.png" alt="UML Diagram Extended" height="900">

### Built With
Used Java spring boot , MySQL and Jason Web Token to build the rest api, including postman for testing.

<div align="center">
<img src="images/logo/java.png" alt="spring" width="100" height="80" style="margin-right: 20px;"> 
    <img src="images/logo/spring.png" alt="spring" width="160" height="82" style="margin-right: 20px;"> 
    <img src="images/logo/mysql.webp" alt="mysql" width="110" height="80" style="margin-right: 20px;">
    <img src="images/logo/jwt.png" alt="jwt" width="85" height="80">
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You should have the below softawares installed in your pc :
* JDK 21 and JRE
* MySQL
* and your preferred IDE or text editor

  

### Installation

1. Get a free API Key at [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Clone the repo

   ```sh
   git clone https://github.com/kudzaiprichard/spring-realestate-api
   ```

3. Open project in IDE or text editor
4. let maven download all necessary dependency for the project to run


