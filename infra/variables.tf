variable "environment" {
  description = "Deployment environment (e.g., dev or prod)"
  type        = string
}

variable "lambda_zip_path" {
  description = "Path to the Lambda zip file"
  type        = string
}

variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "eu-west-2"
}

variable "aws_profile" {
  description = "AWS CLI profile to use"
  type        = string
  default     = null
}