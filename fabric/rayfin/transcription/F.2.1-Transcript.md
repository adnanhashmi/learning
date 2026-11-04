# Transcript

Hello and welcome to this session on the pre-requisites for Rayfin development.

An easy way to remember all the areas in Microsoft Fabric is using the ABCDEF approach shown here.
The various areas in the Microsoft Fabric platform comprise ‘A’ for ‘Administration’ , ‘B’ for ‘Bicep’ or ‘Infrastructure as Code’, ‘C’ for ‘Capacity’, ‘D’ for ‘Data Stores’, ‘E’ for ‘Experiences’, which are called ‘Workloads’ now, and ‘F’ for ‘Flows’ or ‘Task Flows’.
Within ‘Administration’, you manage the ‘Fabric Tenant’, ‘Domains’, and ‘Security Groups’ which affect ‘Workspaces’ and ‘Compute’.
‘Compute’ affects ‘Notebooks’ inside Microsoft Fabric.
When you create a Microsoft Fabric tenant, you have to specify a ‘Capacity’ which the Microsoft Fabric tenant consumes.
Data is ingested and stored in Microsoft Fabric using Pipelines, Data Flow Gen 2, Shortcuts, Lakehouses, and so on.
Microsoft Fabric uses different UI sections called ‘Experiences’ or ‘Workloads’.
The capacity provisioned in Fabric affects the ‘Compute’, and is also tied to Power BI, as well as the space allowed for data storage in Microsoft Fabric.
Each Fabric Data Stores is accessed by an individual ‘Experience’ or ‘Workload’.
Task flows act on experiences or workloads depending on what users want to achieve.
A task flow can be created for a medallion architecture or for machine learning processing.
For real time intelligence scenarios, different experiences and data sources within Microsoft Fabric can be used to capture and process telemetry and log analysis.
Keep in mind that the stored data can either be structured or unstructured. Also, by developing notebooks, developers can write code for processing of data.

Not all areas in Microsoft Fabric take part in Rayfin development.
The areas that are specifically used for development are ‘Tenant’ and ‘Compute’, along with the capacity provisioned and ‘Data Stores’ inside of Microsoft Fabric.

As part of Rayfin development, source code is generated for business analytics logic.
Development takes place if the correct features are enabled.
Lastly, Rayfin development uses capacity, configuration and cybersecurity.

Cybersecurity is a loaded term and comprises primarily of ‘Credentialing’, ‘Compliance’, and ‘Cryptography’.
‘Credentialing’ is achieved using Microsoft Entra ID, ‘Compliance’ is performed using Microsoft Purview, and any ‘Cryptography’ is achieved using Azure Key Vault.
Remember, all these services exist outside Microsoft Fabric although they are used for enterprise development of Fabric Apps.

To understand the different areas that take part in Rayfin development, consider the knowledge map on your screen.
The knowledge map consists of the prerequisites required for Rayfin development, the actual programming logic, and the platform that Fabric Apps use.
Prerequisites are made up of access permissions, the appropriate features, and Node JS or Node package manager.
Programming makes use of the Rayfin CLI, the VS Code IDE, and tracked using Git.
The Microsoft Fabric platform includes the provisioned capacity, the Tenant and Workspace and the application placeholder.
To reiterate, the prerequisites for Rayfin development exist primarily outside of Microsoft Fabric, whereas the Microsoft Fabric platform is hosted on a remote server owned and managed by Microsoft. Finally, programming is achieved using coding.

The prerequisites for Rayfin span services in Microsoft Azure, the Microsoft Fabric platform itself, and the local developer workstation.
Azure Services provide the creation of the Microsoft Fabric in it.
Microsoft Entra ID is used for authentication and authorization.
Finally, Microsoft Preview which is used for governance and compliance.
For Fabric App development, a minimum of F64 capacity is required.
Also make sure that the Fabric Apps feature is enabled from the Fabric administration portal.
Lastly, the Fabric Workspace and the application placeholder must be available as well.
On the developer's PC, the node package manager and node JS are required to write Type Script code.
Rayfin CLI is needed to understand and process Rayfin commands.
In order to author and modify code, VS Code along with GitHub Copilot are also required.
If need be, learners are encouraged to view resources for installation of these pre-requisites.

To recap, this video talked about the Microsoft Fabric platform which can easily be memorized using ABCDEF.
The presentation listed the various tools available for Rayfin development, and the prerequisites required for development.
That brings us to the end of this video.
Thank you.
