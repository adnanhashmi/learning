You must have heard a lot about Microsoft Fabric lately, which was announced during the Build conference in May 2023.
Fabric is the new data analytics platform in the Azure cloud. The Analytics service in Azure was previously called Azure Synapse which used to be a collection of different cloud products. With Microsoft Fabric, the emphasis is on creating a set of services that can be used by different roles in an organization.
Amongst other topics, Microsoft Fabric centers around 3 things: a unified user experience, the Lakehouse architecture, and content that is generated or driven by artificial intelligence.
The 6 key areas in Microsoft Fabric are Data Factory, Synapse Data Engineering, Synapse Data Warehousing, Synapse Data Science, Synapse Real Time Analytics, and Power BI.
2 other areas are Data Activator and Purview. Data Activator is used to generate events and Purview is for data governance. Since these 2 topics are not covered in this session, I decided to assign them zero A and zero B.
In future, we will only talk about these 6 topics.
So, what exactly is new in Microsoft Fabric?
We will start by discussing one of the 3 topics we mentioned a few minutes ago: Lakehouse.
It is common knowledge that the current Azure Synapse Analytics platform will morph into Microsoft Fabric going forward.
Within Azure Synapse Analytics, data engineers, data scientists, or developers can store data in Azure Data Lake Storage or ADLS, Azure SQL, Cosmos DB, or Azure Daka Lake or Kusto. Azure SQL has 2 flavors: Serverless SQL and Dedicated SQL Pool. In Microsoft Fabric, all data regardless of where it actually lives, is exposed using Microsoft One Lake.
The data sources in Azure Synapse Analytics can store ingested data and can also be used to Stage, Serve, and Visualize the data it holds.
All these data sources exist in the same Synapse workspace and can undergo movement and transformation using different services and workflows.
In Microsoft Fabric Ingest, Stage, Serve, and Visualize is handled by One Lake.
Data Movement, Data Transformation, and Workflows happen in One Lake as well, but they are mostly behind the scenes. One Lake is just a local representation of remote data stored else-where.
Microsoft created One Lake using the open source format for building a delta lake, using the delta parquet format. The delta parquet format is able to expose data in unstrctured format such as in Azure Storage accounts, Amazon S3, or in future Google accounts as well.
Lastly, the reason for all this is to allow creation of a lakehouse architecture.
Before we dive into the lake house architecture, let's take a look at the architectures we presently have in various organizations. 
In a warehouse architecture, the organizational data in databases is moved using ETL to a data warehouse from where the structured data can be used to create BI visualizations and Power BI reports, but not machine learning models or Python scripts for data science. 
In a data-lake, structured data from databases along with unstructured information such as tweets, YouTube videos posts and even sound files can be moved using an ETL process to a data lake warehouse, which can store both, structured and unstructured data. This data can be used for BI, creating reports and machine learning models or Python scripts. 
In the end, let's take a look at the Lake House architecture. This is the architecture that is implemented in Microsoft Fabric where structured and unstructured data in the Data lake is tagged or enriched with metadata and governance applied to it. And from there that data can be used for BI analytics including Power BI reports, machine learning models and data science Python scripts.
We are back again at this diagram. The Experiences available to us are Data Factory,  Data Engineering, Data Warehousing, Data Science, Real Time Analytics and Power BI.
One or more data engineers are tasked with the work of moving data in the organization.
The data engineering experience is of course meant for a data engineer’s role or persona.
For Synapse Data Warehousing, the assigned roles are a Data Engineer and a Data Analyst.
The Synapse Data Science experience is used by a data scientist.
For the Synapse Real Time Analytics area, the defined roles are a data scientists and developer.
Finally, a developer is responsible for creating Power BI reports.
Each of the roles and personas can be linearly iIlustrated in a data science workflow diagram on your screen, comprising steps Ingest, Stage, Tain or Consume, and Serve.
The unified user experience is one thing that should definitely be talked about when discussing the new Microsoft Fabric. 
If you look at the current Azure Synapse workspace on your screen right now, it comprises just a few buttons.
You can click the 'New' button to create new artifacts for Synapse Analytics.
If you want to bring in data from internal or external data sources, you can click on the 'Ingest' tile. 
The 'Explore and Analyze' tile allows you to look at the data more closely, whether that data is internal to the organization or you have ingested it from an outside source.
To visualize your data, you can click the 'Visualize' tilr.
Clicking 'Visualize' brings up the 'Connect to Power BI' pane on the right side of the screen.
This is where you can fill in the information to connect to an existing Power BI workspace.
The one thing that I want to highlight is that different users or personas get one UI across the Synapse Analytics Studio, but they get a completely different UI when they jump to another product within Synapse.
Enter Microsoft Fabric. On the surface, the user experience for Microsoft Fabric is not very different from the other UI's that you have already seen from Microsoft. The six areas that I identified previously can be seen here as tiles on the home page UI. Power BI, Data Factory, Synapse Data Engineering, Synapse Data Science, Synapse Data Warehousing, and Synapse Real Time Analytics. 
Clicking each of the tiles will take you to the appropriate service in Microsoft Fabric.
The first is the Power BI Portal. If you have used Power BI in the recent past, you will immediately notice that the experience really has not changed much.
You can click the Power BI button on the lower left side of the screen to open up the menu that lists all the other areas in Microsoft Fabric. If you click the data factory link in the menu you will be taken to the Data Factory screen in your browser.
You can then click the Data Pipeline tile to open or create a new ETL workflow.
Thinking that Data factory button on the lower left side of the screen will open up the menu again.
This time, select the Data Engineering icon to open up the Data Engineering screen in your browser.
The tiles at the top of the Synapse Data Engineering screen allow you to create artifacts for data engineering.
On one of the screens in this experience, the Lake House Explorer shows you a lake house called Karachi Data, and it has two nodes 'tables' and 'files' that display structured and unstructured data. 
These tables and files make up the content of the lake house.
The lake house is really just the data source exposed by One Lake.
Which is only data stored in an internal or external database.
Let's look at some reasons Why you should use Microsoft Fabric in your organization.
If you are watching this video, you either have no analytics capability in your organization, or you are using some non-synapse solution or you are using Azure Synapse Analytics in your organization.
Within Azure Synapse Analytics you have different data sources such as ADLS, Serverless SQL, Dedicated SQL, Azure Cosmos TV and Azure Data Explorer. To save space, I will just be using the Synapse icon.
There are other data sources such as Amazon S3, Databricks, Snowflake, and Apache Spark.
All of these data sources make up a data warehouse in an organization.
On top of that, you can create machine learning experiments or Power BI reports.
Different machine learning experiments can use different data sources that are available.
Power BI reports can use some of those same data sources as well as new data sources to generate reports.
Machine learning experiments and Power BI reports are exposed to different people in the organization.
To allow for proper access control, a subset of users are given access to machine learning experiments.
Whereas others are given access to Power BI reports.
You may have noticed that things can get pretty nasty and difficult to maintain at this point.
Let's now compare it to Microsoft Fabric. You have pretty much the same data sources, but instead of accessing them directly, all these data sources are exposed to what is known as One Lake within Microsoft Fabric. One Lake makes up the Data Lake House.
Machine learning experiments and Power BI reports do not have to access each data source individually, but can access One Lake directly. One Lake along with Azure machine learning and Power BI make up Microsoft Fabric.
To allow users access to Microsoft Fabric, you can use Role-based Access Control or RBAC. This can make the whole implementation fairly easy to manage as well.
One of the other capabilities of Lake House is the ability to create shortcuts. You can create a shortcut to Amazon S3, ADLS or the artifacts within One Lake. Shortcuts can be classified as either external or internal. And they allow users to quickly jump to the data sources even when they are not within the Microsoft Fabric platform.
Remember the Lake House Explorer in the Synapse Data Engineering user experience you saw before?
Click the ellipses to open up the menu. From here, select the 'New Shortcut' item to create a new link to a data-source in your environment.
Creating a shortcut eliminates the need to move the data through an ETL pipeline from a data store to Microsoft Fabric. 
The last item in this presentation is artificial intelligence and how it is incorporated into Microsoft Fabric.
In the Power BI experience, you can use the Copilot dialog to ask a question or make a request using natural language. Suppose you want to create a report. You can request Power BI using the English language by typing it in the dialog.
That's it. Power BI will automatically generate the report for you, saving you countless hours of manual work.
To sum up this section on why you should use Microsoft Fabric: To use the lake house architecture, create shortcuts or the generative AI capability built into the platform. 
This is, by no means an exhauative list, and there are many other benefits of using Microsoft Fabric.
Thank you for listening.
