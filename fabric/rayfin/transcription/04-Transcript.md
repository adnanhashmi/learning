# Transcript

Hello and welcome. This short video is about the typical Fabric App architecture that users will encounter.

Let us quickly look at the steps involved in creation of Fabric apps, which are 'Create', 'Configure', and 'Consume'.
In the ‘Create’ step, developers generate some baseline code for the Fabric App using Rayfin and a text prompt.
In the ‘Configure’ step, UI and data access logic is applied to the Fabric App.
For the final ‘Consume’ step, to allow the Fabric App to be used by stakeholders, it is deployed, validated and served to the end-users.
In specific terms, ‘Create’ involves defining an application placeholder and some boilerplate code, which is further refined as application development progresses.
During ‘Configure’, developers customize the application based on the application’s business needs or requirements.
Finally, the Fabric App is tested and rolled out to end-users who can subsequently access the application using its URL.
Before a single line of code can be generated or written, it is important to apply some thought process captured in a ‘Conceive’ step, meant to create some wireframes and UI designs that provide a glimpse of what the finished application is going to look like.
This involves identifying the data in various data sources and semantic models, and selection of a template to be used for the UI.
In addition, to ensure that the Fabric App meets user requirements, set outcomes or objectives in the beginning that the Fabric App is going to address.
A combination of these steps allows the application to be developed end-to-end, from a simple idea to a functioning Fabric App.

The architecture for Fabric Apps developed using Rayfin was discussed previously in another video, but is provided here for some revision without spending too much time explaining it.
A Fabric App, such as ‘PakTrax’ is housed in Microsoft Fabric, and exposes conversational capability using a chatbot.
The Fabric App serves as the Frontend or UI that end-users interact with.
Layer 1 represents all artifacts that were developed using Microsoft Fabric and provides AI and analytics solutions to the Fabric App.
Microsoft Fabric houses all the data and compute, defined by the capacity SKU, and represented here by Layer 2.
Finally, Layer 3 contains the authentication and governance services provided by non-Fabric products in Microsoft Azure.

Using the same layered architecture approach, let's look at what a typical Fabric App looks like.
On the surface, every Fabric App is developed inside of a Microsoft Fabric tenant, which also provides authentication, governance and repository management services to that Fabric App.
This combines with other AI capabilities in Microsoft Fabric which include data agent, Fabric IQ, and one or more Fabric skills.
The frontend of the Fabric App comprises UI created using TypeScript and JavaScript. In addition, the Fabric App frontend also contains client logic, composed of entities, schemas, and APIs.
Data consumed by a Fabric App is primarily data in One Lake, an ontology, or in an external database Graph QL.
Remember, there are other data stores that are included as well, which serves as the backend of the Fabric App.
The bottom 3 layers combine together into a single Fabric App UI presented to end-users.
When thinking of the architecture of a Fabric App, always keep in mind that the UI uses JavaScript frameworks like React and VUE.
The app service capabilities are created and hosted in Microsoft Fabric.
And the data includes Microsoft Fabric data sources as well as those that exist outside of Microsoft Fabric.
The application itself is packaged and exposed through the Microsoft Fabric tenant.

A series of operations take place when a Fabric App is used.
The layers that take part in the execution of a Fabric App include the user, a web browser, the Fabric App itself, Authentication, the Rayfin client and Data.
The data is provided from either a One Lake, Semantic Models, the Graph QL API, etc. and the data access logic is contained in the Rayfin Client.
Any requests to a Fabric App must be authenticated And that is what the authentication layer provides. Remember, even though it is part of the Fabric App, authentication is mainly handled by Microsoft Fabric.
The Fabric App is accessible through an endpoint.

Execution of a Fabric App begins when a user enters the password using their web browser.
The web browser, in turn, submits the login details to the Fabric App which provides those credentials to a service for authentication.
The authentication result is returned back to the Fabric App which forwards it to the web browser. Finally, the web browser provides the authentication to the end user in the form of a cookie.
Once authenticated, the user submits a request for a resource through their web browser, which forwards the request to the Rayfin Client.
The Rayfin Client generates a query and submits it to the data, resulting in a dataset being returned in response to the query.
The Rayfin Client is responsible for processing the data received, and sends the processed data to the Fabric App.
The Fabric App formats the final response and provides it to the web browser, which then returns it to the end-user.

To recap this video, we talked about the development steps of a Fabric App, a high-level architecture that every Fabric App follows, and the sequence of operations that make up the execution of the Fabric App.

Hope you found this video useful.
Thank you for listening.
