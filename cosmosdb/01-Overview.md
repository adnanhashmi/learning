# Overview

## Transcript

Welcome to this overview of Azure Cosmos DB.

A typical web application comprises of web pages which access a database. Regardless of what the environment is, the database requires manual maintenance. Also, developers create additional technical capabilities for caching data, partitioning tables, indexing the records, geo replication, disaster recovery, analytics, encryption, and security.

Azure Cosmos DB is like any other database, but all the capabilities I mentioned are already inclded in the database and do not need to be re-created.  

Let's take a closer look at the Cosmos DB platform. 

A database can have three workloads.
The Operational workload stores transactional data also known as Online Transactional Processing or OLTP from an application to a database.
An Analytical database stores analytical or reporting data also known as Online Analytical Processing or OLAP that surface insights and predictions from machine learning models.
Lastly, IoT devices send Stearming data to a database that can then be used to generate insights and machine learning predictions.

There are different examples for each database workload. However, you will notice that Cosmos DB is mentioned in each of the three categories. That means that Cosmos DB can be used for any type of database work, and that is a huge advantage that Cosmos DB has over other database products.
Which essentially means that Cosmos DB can be used for every database workload.
When you use any database, you get a server where you can create one or more databases.
Each database has one or more tables, and each table contains one or more rows.
As in other databases, you get an account when you create a Cosmos DB using the Azure portal, and multiple database instances can exist under that account.
To access a Cosmos DB database instance, you have to use the database's host URI or uniform resource identifier.
For that database instance, you can create one or more containers.
Each container has one or more items. An item is just a JSON document, JSON stands for JavaScript Object Notation. This contrasts with a row or record in a typical SQL Server or Oracle database table which can be accessed using SQL.
To recap this section, one of the topics discussed was Database Workloads, chiefly Transactional, Analytical, and IoT.
The second topic was the Cosmos DB Database Architecture, which comprises of an Account, one or more Databases, Containers, and a JSON document which is a record or row of data.
After Platform, we will look at the individual capabilities of Cosmos DB that are available to application developers.
As the Cosmos DB database instance undergoes maintenance in the Azure cloud, it must be partitioned at the time of creation, which tunes its performance as it fills with data. A notable capability of Cosmos DB is indexing, followed by geo-replication, disaster recovery, analytics, encryption, security, and caching.
The first capability we will address has to do with database maintenance.
A typical database is created on a server manually and both must be maintained by a system admin and a database administrator or DBA, a cumbersome task indeed.
Cosmos DB, on the other hand, is maintained behind the scenes after it is provisioned in Azure, requiring only developers to interact with it.
Next aspect is tuning and partitioning.
When a new container is created in Cosmos DB, you have to specify a partition key. In the example on your screen, 'City' is specified as the partition key. The partition key is used to determine which partition the JSON document is stored in, and the way Cosmos DB does it by calculating the Hash value of the key.
As an example, suppose a JSON document is to be stored in a Cosmos DB container. The database calculates the Hash of the partition key value, in this case 'Karachi' and stores it in partition one. 
Similarly, the Hash value of City 'Lahore' causes the record to be stored in a JSON document in partition two.
In the third example, Cosmos DB calculates the Hash of partition key value 'Islamabad' and stores the JSON document in partition three.
'Quetta' goes to partition two.
'Faisalabad' to partition two as well and so on.
Now, we have three partitions in our database and we need to search for the keyword 'Faisalabad'. Because the storage is divided according to the city name, Cosmos DB knows exactly which partition to go to. In this scenario, it is Partition two. This storage in partitions is for performance tuning of the collection.
Regarding Indexing...
In a typical database, the Id column is defined as the primary key, which serves to uniquely identify each record. The primary key column creates an index on that column as well. Table creators have the option of creating additional indices on other columns that might be required for searching as well.
In Cosmos DB, on the other hand, all columns have an index created on each of them by default.
Table creators can, however, exclude columns they do not want to create an index on. In this case, the Latitude and Longitude columns have been excluded.
Lets now talk about Geo Replication. 
In the case of a typical database that is accessed by users with an application, the data is replicated or copied to a secondary read-only database. This is done to switch to the secondary if the primary goes down. The process of creating and maintaining the second database is manual.
For Azure Cosmos DB, the creation and replication to the secondary database is built into the Cosmos DB database. The term Geo is used because the secondary database is in a different geographic location.
In a similar scenario, the secondary replica supports writes as well. This ensures that users close to the other geographic location automatically access the secondary database, and any changes made to that database is replicated to the primary too.
When database geo-replication is enabled, Disaster Recovery must also be discussed.
As previously outlined, an application accesses the primary database, and the data is replicated to a secondary instance.
In the event of a disaster, if the primary instance develops a problem and is inaccessible...
a manual failover has to happen so that the administrator transformes the remaining database to the primary, which is then accessed by the application.
For Cosmos DB, data is kept in the primary database, and replicated to the secondary.
If the primary instance becomes inaccessible, the failver to the secondary is automatic.
Without going into too many details, anytime geo-replication and disaster recovery for Cosmos DB is discussed, you will also hear about Consistency Levels, of which there are five, listed on your screen.
For insights into and analytics of data...
In a typical application scenario, all analytical work is performed by SQL or Structured Query Language, which is an integral part of the database.
While Cosmos DB also supports the SQL syntax, complex analytical operations happen in an instance of the Azure Synapse Analytics service, which is linked to the application's Cosmos DB database. The linking happens by enabling the Azure Synapse link to Cosmos DB in the Azure portal.
For securing data in Cosmos DB, one capability is Encryption.
Before we proceed any further, understand that data encryption is not the same as data masking.
Encryption applies to the database and encodes all the data before storage.
Masking, on the other hand, applies to certain confidential information like Passwords or Credit Card Numbers and conceals or masks the data from people.
Regardless of data Encryption or data Masking, both make use of secret keys to encode and decode the data. The used keys are stored in a Key Management System or KMS.
In a Cosmos DB database...
The data encryption is automatic, and is called encryption-at-rest. The key used to perform the encryption is stored in an Azure Key Vault instance, which essentially is just a key management system.
The Keys are maintained by Microsoft.
However, if the customer owns and maintains the keys in the Key Management System, they are called Customer Managed Keys or CMK.
On the topic of Encryption, lets talk about Security.
In a typical scenario, the database is maintained on-premise by an enterprise, so that only the people from within the organization can access the database. Administrators put additional controls around the database to prevent unauthorized access.
For Cosmos DB, even though the database instance is provisioned in Azure, developers can enable IP Filtering, so unauthoized IP addresses can not access the database.
If application performance is needed, Caching needs to be implemented.
For a typical database that is accessed by an application, developers or app creators have to manually create a cache database that stores query results so that the values do not have to be retrieved from the database.
Some example products that are used to build an application cache are Redis Cache, MongoDB, CouchDB, etc.
With Azure Cosmos DB, the caching capability is built into the product and is called an Integrated Cache. It is also in-memory so it does not require reading from a physical disk drive.
The way Integrated Cache is enabled for Cosmos DB is by enabling the Dedicated Gateway from the Azure Portal.
One Cosmos DB capability that I intentionally left out of the capabilities slide is Change Feed. I did not mention it because I wanted to avoid confusing you. 
Change Feed in Cosmos DB, when enabled, keeps track of all changes made to the data in a collection.
These changes can trigger further events in Azure Functions to do something.
This application capability is referred to as Event Sourcing.
The way change feed works is that it keeps a record of all changes to the data in a separate collection.
The collection that has the source data is called a monitored collection or monitored container. 
The collection that holds the changes is called a lease collection or lease container.
Remember, the lease collection only keeps insert and update operations, and not the delete operations.
In this section, we discussed a number of capabilities that are built into Cosmos DB.
I quickly want to go over the workloads that Cosmos DB addresses.
As mentioned earlier, Cosmos DB can satisfy three separate workloads; Operational, Analytical, and Streaming.
In the Operational workload...
Cosmos DB database instances are used to store application transactional data.
On your screen, the Database A instance is accessed by Application 1, whereas the Database B instance is accessed by two applications, Application 2 and Application 3.
In an Analytical workload...
An instance of Azure Synapse link for Cosmos DB ships the data from Cosmos DB to Azure Synapse Analytics for aggregation.
Data from Cosmos DB can also be used to train machine learning models in Azure Machine Learning, and for visualization in Power BI.
For data streaming scenarios...
IoT devices can store data in Cosmos DB in real-time...
Which can then be used to re-train machine learning models or generate visual reports.
So now, we have covered all the data workloads that can be addressed by Cosmos DB.
To recap, we covered three sections in this presentation; the Cosmos DB platform, its Capabilities, and Workloads.
That brings us to the end of this presentation. Thank you for listening.
