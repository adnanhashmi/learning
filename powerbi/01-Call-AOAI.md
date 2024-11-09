# Calling an Azure OpenAI Service in a Power BI Report 

## Transcript

You might have used some out of the box Copilot capabilities before.
Under the covers, these capabilities use Azure Open AI to offer artificial intelligence functionality to end users.
The whole idea behind Open AI is to pass some text as input to the Open AI Service, and get some other text as result.
While using Power BI, text from a Power BI report serves as input and the resulting value or output is also surfaced in that Power BI report.
The transformation happens inside of Azure Open AI which is called using its API endpoint.
This allows the output text in Power BI generated using AI, a capability that is not present in the Power BI product itself.
The intention of this session is to show you how to call the Azure Open AI API from a Power BI report.
We will be writing and executing some Python code in our report to call Azure Open AI.

I have used a sequence diagram to illustrate the flow of the process.
The Power BI report imports data from a parquet file, to create and populate the semantic model.
The Power BI report opened in the Power BI desktop to execute a Python code script in the Power Query Editor. 
The code calls the Azure Open AI API which returns a result to the calling code.
The Python code then saves the result to the source parquet file.
The data in subscription updated in the semantic model.
A user simply views the Power BI report, which displays all the data to the user in the report.

The Python code we write inside the Power BI report exists in the Power Query Editor.
You can create the code using any Python environment, like Visual Studio Code.
The steps to create the solution are straight forward.
First, you provision an Azure Open AI Service through the Azure Portal.
Secondly, you develop your logic to call the Azure Open AI API endpoint using a Python code snippet.
Lastly, you create your Power BI report that uses the Python code logic you just created. 

Provision the Azure Open AI service by logging into the Azure Portal. 
Click on the Azure Open AI icon to start creation of the service.
Fill out the details for your service. 
Ensure you specify a region where the Azure Open AI Service is available.
Click the 'Next' button until you get to the last screen and click 'Create' to create the Azure Open AI service.
Go to the Azure Open AI Studio and select 'Deployments' from the left menu to create a model.
Click 'Deploy Model' at the top and select 'Deploy base model' from the drop down list.
Select GPT three five turbo, click 'Confirm', specify a name for the deployment,  and click the 'Deploy' button.
A model would be deployed and subsequently shown in the list.

Click 'Chat' on the left menu and then click 'View code'.
Some boilerplate code would be displayed in a new dialog window.
Make sure 'Python' is selected in the drop down list at the top to show Python code.
Flip over to the 'Key Authentication' tab and click the 'Copy' button to copy the code.
In code editor such as Visual Studio Code, paste the copied code in a dot P Y file, the extension used for Python code.
Paste the Endpoint URL, the Deployment Name, and the Azure Open AI API key in the Python code.
More than likely, the deployment name is already included in the code. If you need it, you can get the deployment name from the Azure Open AI Studio Deployments screen.
You can get the Endpoint URL and Azure Open AI key from the Azure Portal.
We will make changes to this Python code later on.

Open Power BI Desktop by clicking on 'Run as Administrator' on your computer.
Before doing anything else, go to the 'File' menu and select 'Options and Settings'. Click on 'Options'. 
The 'Options' window will be displayed.
Select 'Python Scripting' from the left and make sure you have the correct Python installation location selected. 
You can update the location by selecting 'Other' from the list.
Also, select 'Privacy' from the left, and click on the 'Ignore the Privacy Levels' radio button.
Click the 'Okay' button at the bottom of the window.
To enable Python code to execute in Power BI, go to the command prompt and install Open AI, Pandas and Mat Plot Lib packages using the pip command.
Return to Power BI Desktop, create a blank report, and click on 'Get Data' at the top.
In the 'Get Data' dialog, click the 'File' category on the left, select the 'Parquet' connector, and click the 'Connect' button.
I created a sample file called Books dot Parquet and uploaded to Azure Blob Storage.
Paste the Parquet file location from the Azure store in the text box and click 'Okay'.
You can load data directly in Power BI by clicking 'Load' at the bottom of the screen.
For this demo, we will click 'Transform Data' to open the data in a separate 'Power Query Editor' window.

On the 'Transform' tab at the top, click the 'Run Python script' button on the right-most of the tool bar.
Paste the Python script from Visual Studio Code editor into the 'Run Python script' dialog displayed on your screen.
Make tweaks to the Python code to pass the book description to the Azure Open AI API and return the summary as result. 
You can get the code from my GitHub Repo, the address is on your screen right now.

Make sure you install openai, pandas, and matplotlib libraries using pip in the command window.
Just to go over the Python code.
Import packages in your code.
Initialize variables with the endpoint URL, the name of the model deployed, and the Azure Open AI subscription key.
Connect to the API.
Your data will be populated in a Pandas dataframe called 'dataset'.
Iterate over the records, and summarize the description value in the descriptions column.
Store the resulting summary to a new column called Summary A O A I.
When the code is executed, the semantic model is updated.
Click the icon in the header to show a list of columns that you want to show in the report.
Alternatively, you can click on 'dataset' to expand all the columns.
Notice that the new column has been added to the dataset.

That's it. You now have the book summaries from the Azure Open AI Service in your Power BI report. 
I went ahead and created a tooltip that is displayed when I hover my mouse over a book title in my report.
