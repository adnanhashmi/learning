# Overview

## Transcript

Welcome to this overview of Azure Synapse Analytics.
 
In a typical business organization, there are several roles that perform different operations. A data engineer performs ETL operations. A data analyst creates reports that are then used by business decision makers. Developers write applications that are used by the organization's stakeholders. And last but not least, a data scientist creates machine learning models. All of these artifacts rely on data contained in data-stores, and managed by database administrators.
 
The way Azure Synapse Analytics addresses this issue of multiple tools is by providing a single application that is used by all the different analytics' roles in an organization. 
 
Let's take a quick look at how data flows within an organization. 
 
There are four steps in a machine learning workflow. Ingest, Stage, Train and Serve. The workflow starts when data from different sources is ingested, which is then massaged and staged. The third step is to train a model from the staged data to perform predictions. Lastly, the Serve step allows the machine learning model to be used by applications or notebooks. 
 
If predicting from data is not the objective, but the goal is only to report on the data, the workflow is called a Data Engineering workflow, and the third step is replaced by Consume. The output from this workflow are reports which are shared by different stakeholders of the organization. 
 
The workflow can be viewed in a linear fashion, and the steps can be shown as in the diagram on your screen. 
 
The first step is called Ingest, where data is ingested or consumed for further processing. This data can be from different API's, FTP servers or different databases within the organization. Other sources of data may be used as well, both public and private. 
 
The second step is called Stage, where data ingested in the previous step is transformed to generate new data which is Stored for further use. 
 
The Train or Consume step is used to create a machine learning model or a report. 
 
In the final step Serve, the generated machine learning model or the report is used by end users within the organization through some applications or dashboards. 
 
As outlined earlier, different roles within the organization perform different steps. The Data Engineer ingests the data. The Data Analyst stages the ingested data. The Data Scientist consumes that data, and finally, a developer builds applications that serve the generated model or the reports.
 
The different roles or personas use different tools to perform their tasks. The Data Engineer uses notebooks within Jupiter. The Data Analysts uses Microsoft Purview or Azure Data Catalog. The Data Scientist uses either Azure Databricks, Power BI, or TensorFlow to generate machine learning models. Finally, developers use Visual Studio Code, Anaconda or Azure Machine Learning to consume the generated artifacts.
 
Speaking of artifacts, the ingestion brings together data from different sources. Stage stores data at a centrally accessible location. Train consume the staged data to create machine learning models or reports. And finally the Serve step allows applications to expose machine learning models or reports to various stakeholders of the organization. 
 
To recap this section, the machine learning or data engineering workflows each allows different people using different tools to allow creation different artifacts. 
 
In this section, we will take a look at the various components that make up Azure Synapse Analytics. 
 
Whenever you look at a new technology, you have to keep in mind three P's. The Platform itself. The Process required to implement the new platform and how it impacts the current process. And finally the People needed to use the platform effectively. 
 
At a high level whenever I talk about a component of Azure Synapse Analytics, they are either internal services that can be created as part of the Azure Synapse Analytics platform, or external services that exist independently but can be incorporated in the platform. 
 
Right off the bat, let me say that Azure Synapse Analytics is not one single platform, but is composed of a number of different platforms or tools. 
 
The first step to using Azure Synapse Analytics is to create a workspace Smith. A workspace is just a logical collection of Azure resources. That way, users can easily view all the components that they have provisioned within the workspace in Azure Synapse Analytics instance. 
 
The second step is to use the workspace created in the previous step using Synapse Studio. 
 
The third step is to provision resources within the workspace using Synapse Studio. 
 
Coming to the first of the three P's I described earlier, Azure Synapse Analytics comprises of four component categories; ingestion pipelines, data-stores, Code, and Analytics Runtimes or Tools. 
 
The Data Ingestion pipelines category is used to describe the data movement tool available in Azure Synapse Analytics, called the Azure Data Factory or ADF. There are a number of data stores within Azure Synapse Analytics, namely the Azure Data Lake Store or ADLS, Cosmos DB, and SQL. The Code category incldes Notebooks, KQL or Kusto Query Language, Data flows, etc. And then finally, the Analytics Runtimes and Tools category contain Apache Spark, Power BI, and Azure Machine Learning, etc. 
 
The red icons represent whether a component is part of Azure Synapse Analytics, or if they can exist independently outside of the platform as well. The Nails represent parts of the platform, whereas Screws represent tools that can also occur outside Azure Synapse Analytics. 
 
If we were to look at the four steps that I explained earlier, each of these were steps that can be contained within the categories outlined here. The ingest step can be categorized under Data Ingestion Pipelines. Stage falls under Data Stores. Train or Consume can fall under Code, And finally, the Serve step can fall under Analytics Runtimes and Tools. 
 
The four steps are visually represented here. 
 
The Roles that I described earlier are used to perform each of the four steps. The Data Engineer ingests data. The Data Analyst Stages that data. The Data Scientist Trains on or Consumes the staged data. And finally, the developer creates applications that Serve machine learning models or Reports. 
 
To recap the section, there are three P's namely the platform comprising different tools. the data Process, and the  people.
 
The various tools are summed up as Azure Synapse Analytics.
 
As part of this overview session, now I will take a look at Azure Synapse Analytics, the platform. 

You will mainly be interacting with Synapse Studio when using Azure Synapse Analytics, which offers the user experience for the analytics platform. 

The navigation in Synapse Studio offers a way to get to six different pages within the Azure Synapse Analytics workspace: Home, Data, Develop, Integrate, Monitor and Manage.

The Data section or tab in Synapse Studio allows creation of different data sources to store data, namely Azure Data Lake Storage or ADLS, SQL, Azure Data Explorer, Cosmos DB, and other data sources. All these data sources are either internal or external to the Azure Synapse Analytics platform. Even if the data source is external, it can still be accessed using Synapse Studio.

Whether a data source is internal or external, it is allowed access via Linked Services. 

Next, we will be looking at the Develop tab. 

In Develop, users have the ability to write source code to access data stored in the various data sources. 

Users can either write code as a SQL script, KQL or Kusto Query Language, a Notebook, as a Data flow, or an Apache Spark Job Definition. Other code artifacts can be imported from the local hard drive or from an online gallery. 

After Develop, there is an Integrate section or tab in Synapse Analytics. 

Integrate is mainly used for moving data from one data source to another. Azure Synapse Analytics users can develop a pipeline using Azure Data Factory or ADF. They can also use a Copy Data tool. Other data movement artifacts can be imported from either the local hard drive or from a gallery. 

We will lump Monitor and Manage together. 

These sections or tabs allow interaction with Analytics Pools, Connections, Runtimes, and Security.

The Home tab is just an easy way for users to access various links that are covered in other sections or tabs already. 

In the Home tab, developers have links to create a SQL script, a KQL script, a Notebook, a Data flows, an Apache Spark Job Definition, or a Pipeline. Users also have a link to import various artifacts from their local drive. 
 
To recap, Azure Synapse Analytics allow users, regardless of their role, to access a single tool to create different resources for their analytics workloads.
 
That brings us to the end of this presentation.Thank you for listening. Goodbye. 
 
