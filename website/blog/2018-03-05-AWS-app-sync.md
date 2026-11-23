---
title: Using AWS with React Native
author: Richard Threlkeld
authorTitle: Senior Technical Product Manager at AWS Mobile
authorURL: 'https://twitter.com/undef_obj'
authorImageURL: 'https://pbs.twimg.com/profile_images/811239086581227520/APX1eZwF_400x400.jpg'
authorTwitter: undef_obj
tags: [engineering]
---

AWS is well known in the technology industry as a provider of cloud services. These include compute, storage, and database technologies, as well as fully managed serverless offerings. The AWS Mobile team has been working closely with customers and members of the JavaScript ecosystem to make cloud-connected mobile and web applications more secure, scalable, and easier to develop and deploy. We began with a [complete starter kit](https://github.com/awslabs/aws-mobile-react-native-starter), but have a few more recent developments.

This blog post talks about some interesting things for React and React Native developers:

- [**AWS Amplify**](https://github.com/aws/aws-amplify), a declarative library for JavaScript applications using cloud services
- [**AWS AppSync**](https://aws.amazon.com/appsync/), a fully managed GraphQL service with offline and real-time features

## AWS Amplify

React Native applications are very easy to bootstrap using tools like Create React Native App and Expo. However, connecting them to the cloud can be challenging to navigate when you try to match a use case to infrastructure services. For example, your React Native app might need to upload photos. Should these be protected per user? That probably means you need some sort of registration or sign-in process. Do you want your own user directory or are you using a social media provider? Maybe your app also needs to call an API with custom business logic after users log in.

To help JavaScript developers with these problems, we released a library named AWS Amplify. The design is broken into "categories" of tasks, instead of AWS-specific implementations. For example, if you wanted users to register, log in, and then upload private photos, you would simply pull in `Auth` and `Storage` categories to your application:

```
import { Auth } from 'aws-amplify';

Auth.signIn(username, password)
    .then(user => console.log(user))
    .catch(err => console.log(err));

Auth.confirmSignIn(user, code)
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

In the code above, you can see an example of some of the common tasks that Amplify helps you with, such as using multi-factor authentication (MFA) codes with either email or SMS. The supported categories today are:

- **Auth**: Provides credential automation. Out-of-the-box implementation uses AWS credentials for signing, and OIDC JWT tokens from [Amazon Cognito](https://aws.amazon.com/cognito/). Common functionality, such as MFA features, is supported.
- **Analytics**: With a single line of code, get tracking for authenticated or unauthenticated users in [Amazon Pinpoint](https://aws.amazon.com/pinpoint/). Extend this for custom metrics or attributes, as you prefer.
- **API**: Provides interaction with RESTful APIs in a secure manner, leveraging [AWS Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). The API module is great on serverless infrastructures with [Amazon API Gateway](https://aws.amazon.com/api-gateway/).
- **Storage**: Simplified commands to upload, download, and list content in [Amazon S3](https://aws.amazon.com/s3/). You can also easily group data into public or private content on a per-user basis.
- **Caching**: An LRU cache interface across web apps and React Native that uses implementation-specific persistence.
- **i18n and Logging**: Provides internationalization and localization capabilities, as well as debugging and logging capabilities.

One of the nice things about Amplify is that it encodes "best practices" in the design for your specific programming environment. For example, one thing we found working with customers and React Native developers is that shortcuts taken during development to get things working quickly would make it through to production stacks. These can compromise either scalability or security, and force infrastructure rearchitecture and code refactoring.

One example of how we help developers avoid this is the [Serverless Reference Architectures with AWS Lambda](https://www.allthingsdistributed.com/2016/06/aws-lambda-serverless-reference-architectures.html). These show you best practices around using Amazon API Gateway and AWS Lambda together when building your backend. This pattern is encoded into the `API` category of Amplify. You can use this pattern to interact with several different REST endpoints, and pass headers all the way through to your Lambda function for custom business logic. We’ve also released an [AWS Mobile CLI](https://docs.aws.amazon.com/aws-mobile/latest/developerguide/react-native-getting-started.html) for bootstrapping new or existing React Native projects with these features. To get started, just install via **npm**, and follow the configuration prompts:

```
npm install --global awsmobile-cli
awsmobile configure
```

Another example of encoded best practices that is specific to the mobile ecosystem is password security. The default `Auth` category implementation leverages Amazon Cognito user pools for user registration and sign-in. This service implements [Secure Remote Password protocol](https://web.archive.org/web/2018/http://srp.stanford.edu/) as a way of protecting users during authentication attempts. If you're inclined to read through the [mathematics of the protocol](https://web.archive.org/web/2018/http://srp.stanford.edu/ndss.html#SECTION00032200000000000000), you'll notice that you must use a large prime number when calculating the password verifier over a primitive root to generate a Group. In React Native environments, [JIT is disabled](/docs/javascript-environment). This makes BigInteger calculations for security operations such as this less performant. To account for this, we've released native bridges in Android and iOS that you can link inside your project:

```
npm install --save aws-amplify-react-native
react-native link amazon-cognito-identity-js
```

We're also excited to see that the Expo team has included this [in their latest SDK](https://blog.expo.io/expo-sdk-v25-0-0-is-now-available-714d10a8c3f7) so that you can use Amplify without ejecting.

Finally, specific to React Native (and React) development, Amplify contains [higher order components (HOCs)](https://reactjs.org/docs/higher-order-components.html) for easily wrapping functionality, such as for sign-up and sign-in to your app:

```
import Amplify, { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends React.Component {
...
}

export default withAuthenticator(App);
```

The underlying component is also provided as `<Authenticator />`, which gives you full control to customize the UI. It also gives you some properties around managing the state of the user, such as if they've signed in or are waiting for MFA confirmation, and callbacks that you can fire when state changes.

Similarly, you'll find general React components that you can use for different use cases. You can customize these to your needs, for example, to show all private images from Amazon S3 in the `Storage` module:

```
<S3Album
  level="private"
  path={path}
  filter={(item) => /jpg/i.test(item.path)}/>
```

You can control many of the component features via props, as shown earlier, with public or private storage options. There are even capabilities to automatically gather analytics when users interact with certain UI components:

```
return <S3Album track/>
```

AWS Amplify favors a convention over configuration style of development, with a global initialization routine or initialization at the category level. The quickest way to get started is with an [aws-exports file](https://web.archive.org/web/20200925143111/https://aws.amazon.com/blogs/mobile/enhanced-javascript-development-with-aws-mobile-hub/). However, developers can also use the library independently with existing resources.

For a deep dive into the philosophy and to see a full demo, check out the video from [AWS re\:Invent](https://www.youtube.com/watch?v=vAjf3lyjf8c).

## AWS AppSync

Shortly after the launch of AWS Amplify, we also released [AWS AppSync](https://aws.amazon.com/appsync/). This is a fully managed GraphQL service that has both offline and real-time capabilities. Although you can use GraphQL in different client programming languages (including native Android and iOS), it's quite popular among React Native developers. This is because the data model fits nicely into a unidirectional data flow and component hierarchy.

AWS AppSync enables you to connect to resources in your own AWS account, meaning you own and control your data. This is done by using data sources, and the service supports [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), [Amazon Elasticsearch](https://aws.amazon.com/elasticsearch-service/), and [AWS Lambda](https://aws.amazon.com/lambda/). This enables you to combine functionality (such as NoSQL and full-text search) in a single GraphQL API as a schema. This enables you to mix and match data sources. The AppSync service can also [provision from a schema](https://docs.aws.amazon.com/appsync/latest/devguide/provision-from-schema.html), so if you aren't familiar with AWS services, you can write GraphQL SDL, click a button, and you're automatically up and running.

The real-time functionality in AWS AppSync is controlled via [GraphQL subscriptions with a well-known, event-based pattern](https://graphql.org/blog/subscriptions-in-graphql-and-relay/). Because subscriptions in AWS AppSync are [controlled on the schema](https://docs.aws.amazon.com/appsync/latest/devguide/real-time-data.html) with a GraphQL directive, and a schema can use any data source, this means you can trigger notifications from database operations with Amazon DynamoDB and Amazon Elasticsearch Service, or from other parts of your infrastructure with AWS Lambda.

In a way similar to AWS Amplify, you can use [enterprise security features](https://docs.aws.amazon.com/appsync/latest/devguide/security.html) on your GraphQL API with AWS AppSync. The service lets you get started quickly with API keys. However, as you roll to production it can transition to using AWS Identity and Access Management (IAM) or OIDC tokens from Amazon Cognito user pools. You can control access at the resolver level with policies on types. You can even use logical checks for [fine-grained access control](https://docs.aws.amazon.com/appsync/latest/devguide/security.html#fine-grained-access-control) checks at run time, such as detecting if a user is the owner of a specific database resource. There are also capabilities around checking group membership for executing resolvers or individual database record access.

To help React Native developers learn more about these technologies, there is a [built-in GraphQL sample schema](https://docs.aws.amazon.com/appsync/latest/devguide/quickstart.html) that you can launch on the AWS AppSync console homepage. This sample deploys a GraphQL schema, provisions database tables, and connects queries, mutations, and subscriptions automatically for you. There is also a functioning [React Native example for AWS AppSync](https://github.com/aws-samples/aws-mobile-appsync-events-starter-react-native) which leverages this built in schema (as well as a [React example](https://github.com/aws-samples/aws-mobile-appsync-events-starter-react)), which enable you to get both your client and cloud components running in minutes.

Getting started is simple when you use the `AWSAppSyncClient`, which plugs in to the [Apollo Client](https://github.com/apollographql/apollo-client). The `AWSAppSyncClient` handles security and signing for your GraphQL API, offline functionality, and the subscription handshake and negotiation process:

```
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";

const client = new AWSAppSyncClient({
  url: awsconfig.graphqlEndpoint,
  region: awsconfig.region,
  auth: {type: AUTH_TYPE.API_KEY, apiKey: awsconfig.apiKey}
});
```

The AppSync console provides a configuration file for download, which contains your GraphQL endpoint, AWS Region, and API key. You can then use the client with [React Apollo](https://github.com/apollographql/react-apollo):

```
const WithProvider = () => (
  <ApolloProvider client={client}>
      <Rehydrated>
          <App />
      </Rehydrated>
  </ApolloProvider>
);
```

At this point, you can use standard GraphQL queries:

```
query ListEvents {
    listEvents{
      items{
        __typename
        id
        name
        where
        when
        description
        comments{
          __typename
          items{
            __typename
            eventId
            commentId
            content
            createdAt
          }
          nextToken
        }
      }
    }
}
```

The example above shows a query with the sample app schema provisioned by AppSync. It not only showcases interaction with DynamoDB, but also includes pagination of data (including encrypted tokens) and type relations between `Events` and `Comments`. Because the app is configured with the `AWSAppSyncClient`, data is automatically persisted offline and will synchronize when devices reconnect.

You can see a deep dive of the [client technology behind this and a React Native demo in this video](https://www.youtube.com/watch?v=FtkVlIal_m0).

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/FtkVlIal_m0?rel=0"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen></iframe>

## Feedback

The team behind the libraries is eager to hear how these libraries and services work for you. They also want to hear what else we can do to make React and React Native development with cloud services easier for you. Reach out to the AWS Mobile team on GitHub for [AWS Amplify](https://github.com/aws/aws-amplify) or [AWS AppSync](https://github.com/aws-samples/aws-mobile-appsync-events-starter-react-native).
