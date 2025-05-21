# Lambda Text analysis

This repository contains Terraform configurations and Node.js Lambda function code to deploy a Lambda function to AWS with separate **dev** and **prod** environments.
----

## Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Terraform](https://www.terraform.io/downloads.html) (v1.5+ recommended)
- AWS CLI configured with named profiles for your environments (e.g., `terraform-user`)
----

## Setup
clone repo
npm i 
npm run build
npm run zip:dev // for dev
npm run tf:dev // dev
npm run zip:prod // for prod
npm run tf:prod // for prod

example of how to test it 
Once deployed invoke lambda with a request body which includes text:"hello world'
{
    body: {
        text:"hello world"
    }
}
----

## Notes 
ensure AWS cli is set up with a user profile that has correct permissions.
----

