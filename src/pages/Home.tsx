import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 py-24"
    >
      <main className="mx-auto flex max-w-3xl flex-col gap-5 rounded-xl border-2 border-solid border-primary p-5 text-lg">
        <p className="text-2xl font-bold">Greetings!</p>
        <p>
          Thank you for visiting my demo website. This platform serves as a
          streamlined course booking website, offering users the ability to sign
          up, sign in, view available courses, and enroll in their desired
          programs. The website is built using an array of serverless services
          provided by Amazon Web Services (AWS).
        </p>
        <p>
          The underlying infrastructure of this website leverages DynamoDB as
          the database, specifically chosen for its compatibility with the
          serverless environment. Initially, I experimented with MongoDB but
          decided to migrate to DynamoDB to optimize scalability, allowing for
          seamless expansion as demand increases.
        </p>
        <p>
          To ensure secure user authentication and authorization, I implemented
          the AWS Cognito service, which also serves as an authorizer for
          private Lambda functions. Prior to signing in or registering, users
          are prompted to complete a Google Captcha verification process. Upon
          successful validation, Cognito saves the user to the Cognito Userpool,
          with email confirmation required for signing in. Subsequently, a
          Lambda function is triggered to capture the user&apos;s information,
          which is then stored in DynamoDB.
        </p>
        <p>
          The compute service driving this website is AWS Lambda, seamlessly
          integrated with API Gateway to enable internet-based invocations. All
          backend logic, including database connectivity, is handled within the
          AWS Lambda environment.
        </p>
        <p>
          On the client-facing side, this website employs React with Typescript
          and TailwindCSS, providing a rich user interface experience. Hosting
          is accomplished using the Simple Storage Service (S3) provided by AWS.
          The content within the S3 bucket is served through CloudFront, an AWS
          CDN service that enhances website performance by efficiently caching
          and delivering both static and dynamic content from edge locations
          worldwide.
        </p>
        <p>
          Domain name system management is facilitated through AWS Route 53,
          allowing me to map the domain name I purchased from Namecheap to
          various services such as CloudFront and API Gateway.
        </p>
        <p>
          To streamline the deployment process, I rely on the automation
          capabilities of AWS CodePipeline and CodeBuild, both managed services
          by AWS.
        </p>
        <p>
          By harnessing the power of these AWS services, I aim to showcase my
          expertise in developing serverless applications. This architectural
          approach ensures scalability, cost optimization, and high
          availability, empowering the website to handle varying traffic loads
          efficiently. The seamless integration of these services fosters a
          smooth user experience and allows me to focus on developing robust
          application logic, rather than managing intricate infrastructure
          details.
        </p>
      </main>
    </motion.div>
  );
}
