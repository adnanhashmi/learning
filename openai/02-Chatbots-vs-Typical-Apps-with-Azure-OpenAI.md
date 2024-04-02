# Chatbots versus Typical Apps with Azure OpenAI [2/3]

## Transcript

If you go to Chat dot Open AI dot Com, type a question and press enter, you will get a text response back.

You can ask a second question, but this time, it will remember what you asked it previously. 

And based on that you will get the response back.

Let's ask it a third unrelated question.

And you will get the response as text back as well.

You can start a new chat, but the chat from the previous session is stored on the right side of the screen.

You also get the option to jump back to a previous chat in the history.

This demonstrates how the functionality of Open AI is exposed as a chat bot.

This presentation will talk about how Chat bots differ from typical applications. However, both are developed using Azure Open AI in the background.

Open AI includes a number of technologies, but Chat bots and Chat GPT are foremost that are most commonly known.

Key takeaways from this session include differentiating between Chat bots and typical applications and sparingly describing how Azure Open AI can be used for developing and deploying a chat bot.

A typical web application front end calls data and logic in the back end. In reality the back-end comprises of databases, logic and internal or external API’s. Speaking of API's, Open AI is just an API and Azure Open AI is the Azure version of the Open AI API, and is just like Azure Cognitive Services.

Open AI has its own App Store which is used to develop solutions for the regular Open AI. However, Azure Open AI requires development using the Azure platform.

Just as any application calls a sample API in the back end, so too it can call Azure Cognitive Services and Azure Open AI API.

In these cases, the application may be termed as an intelligent application.

Note that to call the Azure Open AI API, the application will submit the request in natural language and the response is in natural language as well.

Let's look at a demo of Open AI Chat GPT Plus which requires a monthly paid subscription.

I ask the application a question and receive a response back as text.

The second question, however, asks for an image in response.

Chat GPT Plus generates an image and provides the image as response in the web browser. Keep in mind that generating an image is not possible without a subscription.

You also have the option to specify which model needs to be used for responding.

In addition, with the paid subscription you also get access to several GPT's created by different individuals using the application store.

For creating a chat bot, You can develop a custom application in Visual Studio that calls the Azure Open AI API. The second option is to create a Copilot.

Regardless of how it is developed, the chat bot will use the Azure Open AI API.

The Azure Open AI API, in turn, calls a GPT model that was trained using a large body of natural language text content. You also have the option to augment this with your own custom text content to train the machine learning model.

In the specific case where you used your own custom content, it is called Retrieval Augmented Generation or RAG.

The other option is to create a custom model from scratch. However, creating a custom model is very expensive, and not recommended.

Copilot offers a no code solution for developing chat bots. Already, there are a lot of chat bots for different products available. 

All of these chat bots or Copilots, created by Microsoft, are associated with a different product and made available to the users of that product.

We already described how Azure Open AI sits behind any chat bot you create.

Chat bots can either be created using Azure AI Studio or in Copilot Studio.

We would take a look at Azure Copilot Studio first, accessible at Copilot Studio dot Microsoft dot Com.

The Chat bots you see in the Microsoft world are developed using Copilot Studio.

Even a TV commercial for Microsoft featured Copilot.

The commercial premiered during the Super Bowl 2024.

Developing a copilot is very straight-forward and involves some simple steps. You start by creating a copilot using Copilot Studio. Then you specify a data source. You can modify the workflow of the chat bot visually without writing any code. And as a last step you publish the Chat bot to a channel.

This session will cover the steps shown in green here.

Create a new copilot in the Copilot studio and specify a name, and then click the ‘Create’ button. 

The creation process takes a couple of seconds.

Once the chatbot is created, click on it’s name in the list.

Click the button titled ‘Go to Generative AI’.

On the next screen you get the option to upload one or more documents.

I am going to upload a PDF file for the draft Artificial Intelligence policy for Pakistan.

As long as the uploaded file is within the specified limit, it will finish uploading.

Scroll down the page and enable the option titled ‘Boost Conversational Coverage with Generative Answers’.

Hit the save button at the top.

And enter a question to ask the Chat bot.

You will get the answer to the question or prompt as shown.

Just as an example. I asked the Chat bot another question and got a response back, including the citations which are essentially just links to the original data source.

If you click on the question, you can view a visual of the chat bot workflow.

Before I show you how to publish the chat bot, let me begin by showing you the different channels that you can deploy the chat bot to.

To publish a chat bot, go to the ‘Publish’ page by clicking ‘Publish’ on the left navigation menu, and then click the ‘Publish’ button at the top. You will get a dialog box to confirm that you want to publish.

After you click ‘Publish’, it will take a few seconds for the copilot to be published.

You will receive a success message. In my case, I published the copilot to a demo website. I can click the link and see the chat bot in a custom web application.

That's it. I can ask a question and get a response back as text.

Just like any typical web application you create that interacts with a back-end, the application can talk to the Azure Open AI API.

We just saw how you can use Copilot Studio. Let's now look at how you can create and publish a chat bot using Azure AI Studio.

Go to the Azure Portal at Portal dot Azure dot Com and click the Azure Open AI service you created.

To go to the actual Open AI Studio, click the link at the top.

On the home page of Azure Open AI Studio, you can click the button titled ‘Create New Deployment’. 

If you just provisioned the Azure Open AI Service, there are no deployments created yet. Click the plus icon to create a new deployment.

The ‘Add deploy model’ dialog window will open asking you to select a model, a model version and the name of the deployment. Once you specify those values, click the button titled ‘Create’. 

A new deployment is created and listed under deployments.

You can further click the deployment name to see additional details for the deployment. To view the chat bot in action, click ‘Open in playground’.

Be sure to select ‘tax’ as the template for the Chat bot. You can now ask a question pertaining to tax from your chat bot using natural language.

A response to your question is returned and displayed in the web browser.

You also have the option to look at the return JSON string using the ‘Show JSON’ option.

For further programming, you can specify a language and generate a sample source code to call the Azure Open AI API.

As a last step, you have the ability to deploy the chat bot by specifying the name, selecting your subscription and the Azure resource group. You also have to specify the pricing plan so that you can be billed for the usage.

To sum up what was mentioned in the session, you can create chat bot by embedding them in a custom application or by developing a copilot. Both of these options call the Azure Open AI service in the background. If you develop a custom application, you can write code by using the Azure AI Studio, whereas for a copilot you can use the Copilot studio, which is a no code approach.

Also, if you use the Copilot Studio, once you have the Chat bot or Copilot ready, you can publish to a channel to surface the chat bot to end-users. Channels include a custom application, or Microsoft Teams or even Facebook.

Thank you for staying till the end of this session. Please like and subscribe. Goodbye!

