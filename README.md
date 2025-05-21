# Lambda Text analysis

This repository contains Terraform configurations and Node.js Lambda function code to deploy a Lambda function to AWS with separate **dev** and **prod** environments.
----

## Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Terraform](https://www.terraform.io/downloads.html) (v1.5+ recommended)
- AWS CLI configured with named profiles for your environments (e.g., `terraform-user`)
----

## Setup
clone repo<br>
npm i <br>
npm run build<br>
npm run zip:dev // for dev<br>
npm run tf:dev // dev<br>
npm run zip:prod // for prod<br>
npm run tf:prod // for prod<br><br>

example of how to test it <br>
Once deployed invoke lambda with a request body which includes text:"hello world'<br>
{
    body: {
        text:"hello world"
    }
}
----

## Notes 
ensure AWS cli is set up with a user profile that has correct permissions.
----

### exmaple responses


<img width="457" alt="Screenshot 2025-05-21 at 12 17 05" src="https://github.com/user-attachments/assets/d573f9ed-904b-4928-9635-4713f2942408" />
<img width="763" alt="Screenshot 2025-05-21 at 12 16 53" src="https://github.com/user-attachments/assets/4e5e2141-7926-4b34-9b48-d7a183b79255" />
<img width="943" alt="Screenshot 2025-05-21 at 12 16 40" src="https://github.com/user-attachments/assets/92be7241-a8f0-4ff1-b401-3b41b1601ffe" />

