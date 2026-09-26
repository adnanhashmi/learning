# Transcript

Hello and welcome to this video where we compare Fabric Apps with traditional web applications.

To differentiate between Fabric Apps and other web applications, lets look at a typical flow for both types.
Both types present a frontend to be accessed by a human user.
Fabric Apps have their processing logic as a Rayfin Client which is responsible for talking to data.
That data is internal to Microsoft Fabric and is, under the covers, stored in the open source parquet format.
Web applications, on the other hand, utilize many different technologies in their stack to interact with a backend, which usually is a relational database queried using the structured query language or SQL.

Note that Fabric Apps are used for reporting or online analytical processing or OLAP.
Web applications, conversely, are transactional applications for online transaction processing or OLTP.
The code for Fabric Apps is generated using vibe coding, with an LLM and Rayfin.
Web application code is created manually in an integrated development environment or IDE.
Since Fabric Apps are created for reporting use cases, they are predominantly used for reporting or online analytical processing or OLAP , and in some cases where data needs to be written back, a combination of a translytical task flow and a Fabric user defined function or UDF is used.
In web applications, create, retrieve, update, and delete operations, or crud, are performed on the database using sequel.

Before developing an application, when a development model is being chosen, remember that Fabric Apps should be used if the data resides in Microsoft Fabric and a reporting solution needs to be rolled out quickly that can be accessed in a web browser.
A typical web application requires manual efforts but offers the most flexibility.
Finally, there are scenarios where both models need to be implemented for a single application to offer reporting services, as well as transactional processing.
To summarize, Fabric Apps offer online analytical processing or OLAP, whereas traditional web applications are developed for online transactional processing or OLTP.
Keep in mind that PakTrax uses the hybrid development model.

The steps for development of Fabric apps were discussed in a previous video, so it will not be explained again. Just remember that the steps mainly comprise of ‘Create’, ‘Configure’ and ‘Consume’, and before any work can be done on the application., it is highly recommended that developers spend some time conceiving what the finished application would look like.

For development of traditional web applications, there are slight differences in the steps involved. Creators engage in ‘Develop’, ‘Debug’, and ‘Deploy’, but before doing any of that work, they are tasked with the application ‘Design’ step, which involves identifying and consuming data sources, defining the operations that will be performed on the data, and the UI or UX design.

Again, this architecture diagram was shown in the previous video, but just to reiterate, the application is hosted inside of the Microsoft Fabric tenant, and is mainly composed of the frontend and Rayfin Client Logic that users interact with.
AI logic forms a separate layer.
Application data is exposed through One Lake, an Ontology based on Lakehouse data, Graph QL, etc., and the Fabric App and logic communicate with each other.

A side-by-side comparison of a Fabric App with a traditional web application shows us that the application is deployed in Microsoft Azure and can essentially include other hosting service providers like Amazon or Google.
The Azure layer hosts services like Entra, Purview, Key Vault, and others.
The application itself resides in another layer comprising of the UI and the data access logic which communicates through business objects or classes, Queries or other third-party libraries.
The data for the application is housed in one or more databases such as Cosmos DB, Azure SQL or in a non-Microsoft database like Databricks. Of course there are other data sources as well.
The application logic resides mainly in solutions developed for agentic AI using AI skills, Model Context Protocol or MCP, etc.
The application communicates with the data as well as the logic.
Similarly, logic is also responsible for communicating with various data sources.
All these layers are combined and surfaced as a single web application to end-users.

The sequence of operations in a Fabric App can be categorized as ‘Authorization’, ‘Requesting the data’, ‘Processing it’, and then ‘Returning a Response’ to the end-user.

The sequence for a web application is very similar to a Fabric App, with the only exception being that any database that the application accesses needs to get authorization from Azure App Services, primarily from Microsoft Entra ID, before data can be returned.
That adds an extra step to the sequence which has been highlighted here.
All the other operations remain as they were in the Fabric App.

To recap what was discussed in the video, there are certain considererations when choosing between a development model for Fabric Apps versus traditional web applications.
The video did a comparison with traditional web applications, and finally culminating into a short overview of architecture and execution sequence for both.

That does it for this session. See you in the next one and thank you for listening.
