# Building Intelligent Apps using Azure OpenAI [1/3]

## Transcript

Hello and welcome to this session on building intelligent apps using Azure Open AI.

In Adobe Photoshop you can take any image, select an area of the image, and specify in text want you want to generate an image of.

Within seconds Adobe Photoshop generates 3 variations of the description you typed.

You can view the generated variations by clicking the next button.

You are able to hear about Open AI everywhere these days. There are a lot of terms that accompany the term Open AI.

Let’s understand why Open AI is needed.

If you look at a typical web application front-end that is accessed by a user, it uses a back end that comprises data and logic, specifically databases, business logic, and even some API services. 

Looking at API’s, Open AI is one API, and Microsoft’s version in Azure is called Azure Open AI, just like Azure Cognitive Services.

Microsoft invested ten billion dollars in the Open AI organization to use their technology.

My intention with these sessions is to show the use of Azure Open AI to go beyond chat bots to build an intelligent application.

You might have come across the term Large Language Model on the Internet.

In reality, a Large Language Model is just a concept, like object oriented programming. It's not related to any specific vendor or platform.

An LLM or large Language model is just a machine learning model which has been trained like any machine learning model should be. It is called Large because it's been trained on a very large corpus. A very large body of text.

The term Foundational Model is also used for an LLM.

Just like any machine learning model, an LLM has one or more parameters.

Some examples of large language models are GPT 3.5 by Microsoft, Dolly by Databricks and Bard by Google.

I have also included a link that has a list of large language models by different vendors.

Again, keep in mind that a large language model is just a machine learning model and nothing more.

What I intend from this presentation is to acclimate you with Open AI concepts, to teach you how to develop using Azure Open AI, and briefly how you can differentiate between Lang Chain and Semantic Kernel.

Before large language models or GPT was released at the beginning of this year, which I would call the old times, this is what a typical neural network looked like.

It consisted of an input layer comprising some inputs, an output layer with some outputs, and one or more hidden layers.

The three common examples of neural networks are convolutional neural networks or CNN, Recurrent Neural Networks or RNN, and Generative Adversarial Networks or GAN.

Convolutional neural networks are mainly used to process images to allow a computer to determine what is included in an image file. 

Recurrent Neural networks are used to process text. 

Lastly, Generative Adversarial Networks are used to generate content.

In this new era, you no longer have to create neural networks manually. You get a pre-developed machine learning model that you can provide some input data and get results as output.

In case of Open AI, the input is in the form of text, And the result is also a text string. Remember, the result is called a response.

To expand further, the input is known as a prompt. The resulting value can either be text, Or an image file, or even some programming code.

With Azure Open AI, the large language model exists in Azure and is surface or exposed as an API service.

Behind the scenes, each of the outputs are created using machine learning models.

The text output is generated using GPT models. The image output is generated using Dall E, And the programming code is generated using Codex models.

In summary, with Azure Open AI, once the input is provided, the outputs can either be classified as a completion, a Chat completion or an Embedding. 

A completion is just an answer to a question, whereas a chat completion is a reply to an ongoing conversation. We will discuss Embedding a little later.

When you use the Azure Open API model, you specify 2 parameters, temperature and top P. Each of these parameter values determine how closely related the generated output relates to the text provided as input. The higher the value of the parameters, the less the output is related to the input. You will have to tweak the values of these two parameters to strike a balance that is appropriate for your use case.

Anytime, text is processed by a computer, it is known as Natural Language Processing or NLP. This list pertains to the tasks that are associated with NLP.

Let's look at our first demo in this session, which is internal only to Microsoft employees.

Open the website foundry toolkit dot azure websites dot net slash playground V two in your web browser.

Type your question in the search box.

When you click the button, this website calls the Azure Open AI API service to return a response back to you. That generated response text is displayed on your screen as shown.

When you use Azure Open API. you need to understand these three concepts. Tokens, vectors and embeddings.

Let's look at tokens first. 

If you have a piece of text like America signed an agreement with China today, The API divides the text into separate segments. 

In this scenario, the example sentence comprises of 15 tokens. Tokens offer a way for a sentence to be measured and to calculate costs.

Vectors are just a numeric representation of the input text.

The process of converting text into vectors is known as embedding. You don't have to do anything to achieve this because it happens automatically behind the scenes.

Let's look at an example of why vectors are used. 

For instance, you have a piece of text Pakistan, which can be related to the words China and Saudi Arabia, but not Pizza.

In the second example, the word Pizza can be related to words Burger or Macaroni, but not Urdu. 

The way that the computer calculates these is using vectors.

So why are vectors used? The answer is similarity. 

Again, the numeric value and how close it is to another vector or numeric value determines if the two are related.

Let's look at a publicly available demo for vector search.

Go to AKA dot MS slash vector search demo. Any term that you search for, the website determines related terms using vectors and displays the results in your web browser.

You can also search for images related to a term like this.

You have seen this diagram before. 

With Azure Open AI API, you use an application code to call the API. 

And the resulting outputs are also consumed by the application.

Let me demonstrate this with the T Prompt Chatbot. Again, this demo is only accessible only to Microsoft employees.

If you go to the T Prompt chat bot in your web browser at AKA dot MS slash T Prompt, you can select a model that this chat bot has been trained on. When you enter something in the text the response from the Azure Open AI API service is displayed on the page.

Of course you have to write code to call the Azure Open AI API service. 

The code that you write involves three steps. 

Number one, you have to provision the Azure Open API service using the Azure Portal. 

Second, you have to deploy a model. 

And lastly number three, you have to write the code to call the API.

Let's look at the demo of this.

Log into the Azure portal and create an instance of the Azure Open AI API service.

To play with the Azure Open AI API service endpoint you created, click this button and go to the Azure Open AI Studio.

You can create a model on the deployment screen and then chat with your API endpoint.

When you are writing the code to call the API, you can either use Lang Chain or Semantic Kernel. Both of these are libraries that you can use.

Lang Chain is open source and it can be used in code written in Python, JavaScript or TypeScript. You can get more examples on Lang Chain dot Com. 

On the other hand, Semantic Kernel is owned and maintained by Microsoft and can be used to write code in Python, C# or Java. 

You can learn more about this at AKA dot MS slash Semantic Kernel.

I wrote a post a few months ago on Semantic Kernel in English and Urdu at this URL.

You can find some code samples for Semantic Kernel at this Git Hub Repository.

Please share this video and the following URL's. Thank you.
