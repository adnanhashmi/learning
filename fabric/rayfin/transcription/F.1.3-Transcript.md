# Transcript

Hello and welcome.

The book, and indeed this course, presents examples for a make believe organization called Gwadar Port Corporation or GPC that also implements a Fabric App called PakTrax.
The main idea behind this is to give learners a real-life landscape to implement solutions in.
This also allows communicating how an organization reacts to changing business requirements, for example the geo -trategic climate, policies, demand shifts, etc.

GPC is a Port Authority, partially owned by the government.
The organization, itself, is fictitious, but follows real-life business scenarios that it functions in.
Lastly, GPC's business model is to handle cargo that is transferred into the country or out of it.

The organization is physically located in Gwadar, in the Balochistan province of Pakistan.
To give learners some context, here is a small geographic lesson.
GPC is the actual port city of Gwadar, and countries in the neighborhood include China and Iran.
This slide also calls-out where the infamous Strait of Hormuz is.

Simply stated, Gwadar Port Corporation is involved in 3 steps: Initiation, Process, and Dispersal.
‘Initiation’ is the process of optionally tracking  the manufacture of goods and services that will later be shipped.
‘Process’ is the main activity that GPC engages in, which is to view the quality of the products, their storage and eventual transportation to other parties.
In the ‘Dispersal’ phase, which is mainly performed by third parties, the eventual delivery and sale of the goods is tracked and optionally reported back To GPC.
In other words, GPC is engaged in shipment tracking, calculating insights to deliver the goods, as well as communication with other agencies like governments, customs, shipment companies, etc.

Individual steps in the ‘Initiation’ phase are not covered here which are mostly carried out using other non-Fabric solutions.
However, the ‘Process’ step is the most crucial because it is handled by Microsoft Fabric.
The third phase is ‘Dispersal’ which is where Microsoft Fabric calls PakTrax to report the collected data to GPC stakeholders.

A high-level view includes Microsoft Fabric and Power BI both accessing data stored inside of Microsoft Fabric, which essentially is either One Lake, Lakehouse, a semantic model, or other storage services.
An end-user accesses the Microsoft Fabric tenant or Power BI to get data or other capabilities.
To allow users to get all data in a single view, GPC has developed PakTrax, which communicates with Microsoft Fabric and the Fabric data to provide information to the stakeholders without requiring them to individually go to different workspaces inside of Microsoft Fabric or to different reports in Power BI.

A characteristic PakTrax scenario involves the data being housed on-premises inside the GPC organization, from where it is ingested using Data Factory, and staged into a cloud database like Cosmos DB or Azure SQL.
Each database instance is owned and managed independently by a branch office.
All the data is, however, combined by a Notebook to produce a machine learning model for calculation of predictions or inferences.
The data is amalgamated and housed in a Lakehouse database from where it is accessed by the PakTrax web application created using Rayfin to serve to end-users.

With PakTrax, users can view a UI in their web browser and be able to filter that data.
Depending on the information they are looking for, the dashboard displays the inbound and outbound cargo, the status of the ingestion from other sources, and if any customs are scheduled for the time-period specified using the filters.
If there are any alerts or action items that need to be addressed, they are displayed in the dashboard in the Alerts section.
The image on your screen is a wireframe to give learners an idea of what the UI would look like.

To recap what was discussed in this short video, we talked about the Gwadar Port Corporation, or GPC, at a high level.
We talked about the anatomy of the PakTrax application as it consumes data from Microsoft Fabric.
Finally, we quickly looked at the UI dashboard using a wireframe.

Thank You.
