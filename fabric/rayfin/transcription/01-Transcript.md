# Introduction to Microsoft Fabric Apps

Hello and welcome.

Regardless of the technology or platform being used, the data or analytics' process defines the activities performed to deliver value to the business.
The process starts by extracting and copying data from multiple  internal and external sources using an ETL or ELT workflow.
The ingested data is made available for further processing by loading to a data store, a process known as staging the data..
The staged data is transformed or used for machine learning training.
The last step entails delivering the solution to end-users which delivers value to the business.

While the process can be applied to any analytics' platform, Fabric Apps are used in the last step of the process to expose Fabric data to users.

The diagram from the book on your screen is used to compare the services in Microsoft Fabric with those of Synapse Analytics. Let's hide Synapse Analytics to focus attention on Microsoft Fabric.
Note the numbered zero to three steps that we discussed in the previous slide.
To serve an analytics solution to users, Fabric Apps are used to report data that already exists in Microsoft Fabric.

Simply stated, the code for Fabric Apps is in TypeScript, generated using a natural language text prompt that uses an LLM.
Fabric Apps are generated using Rayfin, and the finished apps are used to mainly serve artifacts that are in a Microsoft Fabric tenant.
These artifacts range from data providers like One Lake to more complex items like ontologies.

Fabric Apps mainly eliminate the need for users to go individually to Microsoft Fabric artifacts to extract the information they want.
This is achieved through a web application that combines everything into a single and consistent view.
Instead of having application owners maintain security separately, Fabric Apps rely on One Lake Security or Role Based Access Control to manage access permissions for end-users.

To illustrate Fabric Apps, I am going to use a knowledge map.
Fabric Apps are created using Rayfin, but keep the data they consume in Microsoft Fabric.
In addition, Power BI reports may also be surfaced through Fabric Apps, though not directly, since it involves some licensing constraints.
To sum up the last few seconds, Rayfin provides a frontend for the application that users interact with.
Microsoft Fabric contains the logic and the data used by Fabric Apps.
Microsoft Fabric also manages one or more semantic models created using the Fabric Web UI, or through the Power BI Desktop.
Finally, Power BI is the reporting platform that uses data exposed through Microsoft Fabric.
So far, so good. Let's add some more clarifications.
The Rayfin CLI generates UI for Fabric Apps, plus it also creates data access logic by looking at the schema. Fabric Apps UI uses that data access logic or object relational mapping or ORM to populate data in the UI.
Microsoft Fabric defines and keeps any business logic and also stores data in One Lake, Lakehouse, etc.
Keep in mind, Microsoft Fabric data is used to define and create semantic models.
Those semantic models, in turn, are processed by Power BI reports.
Power BI creates and manages reports and dashboard aimed at serving data to end-users.
The Power BI reports and dashboards are used by machine learning models in Microsoft Fabric, trained through data from Microsoft Fabric.
Fabric Apps allow surfacing of AI agents that use large language models from Microsoft AI and Azure Open AI.
These AI agents are served through the Fabric Apps UI, which also uses the custom-built machine learning capability.
The LLM services are also used by Power BI reports and dashboards mainly for reports that use generative AI and natural language.
Lastly, in certain instances, an LLM may be further tuned with the stored data to produce more accurate responses.

A typical implementation of Fabric Apps looks like this.
The implementing organization, of couse, has an on-premises network  that has its users, storage, and other systems.
There may also be another organization's network that the implementing org interacts with that has its own storage and other systems.
The implementing organization has a network in Azure that houses its cloud resources.
Security is primarily driven by the on-premises Active Directory which is synchronized with Microsoft Entra ID (formerly called Azure Active Directory or AAD) in Azure.
Microsoft Entra ID also authenticates Key Vault, a service to manage secrets for various services.
Also, the on-premises Active Directory is responsible to provide authentication to the organization's systems and databases.
On the partners network, data is populated into systems implemented in that organization.
Data, whether it resides on-premises or stored externally within the partner organization, is extracted or ingested using data factory.
The ingested data is loaded or staged in a Microsoft Fabric Lakehouse.
The staged data is then consumed to train a machine learning model which is used in future for making predictions.
Data changes and inferences or predictions are written to Microsoft Fabric storage, usually a Lakehouse, from where it is accessed and used for Power BI reports. Power BI reports may also use data from on-premises databases.
Data from the Lakehouse, as well as from the Power BI reports is surfaced in Fabric apps.
The Fabric Apps UI delivers insights to end-users in the implementing organization.

The lifecycle of all Fabric Apps begins with discovery, which essentially means identifying the available data, refining the idea behind Fabric Apps creation, and selecting and communicating the intended outcomes.
Next, Rayfin is used to consume the existing artifacts from the Microsoft Fabric tenant. The artifacts comprise of data stored in OneLake to that exposed by a semantic model; agentic AI developed using Fabric IQ, and ontology, as well as telemetry data exposed by a Fabric Eventhouse and accompanying real-time dashboard.
All of this combines together to create Fabric Apps which are then deployed to the Microsoft Fabric tenant.
To understand the lifecycle, you can think of the entire process as three steps: Design, Develop, and Deploy,
While generative AI using an LLM generates code for Fabric Apps, Discovery is carried out by the technical team, whereas use of Fabric Apps is done by Business Stakeholders.

To recap this video, it discussed the need for having Fabric Apps.
The video talked about the generic data or analytics process followed by all platforms including Microsoft Fabric.
Lastly, the lifecycle of typical Fabric Apps was discussed and how the data or analytics process applies even to the development and rollout of Fabric Apps.

Thank you for watching.
