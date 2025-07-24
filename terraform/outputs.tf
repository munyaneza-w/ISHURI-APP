output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer. Access your application here."
  value       = aws_lb.main.dns_name
}

output "ecr_repository_url" {
  description = "The URL of the ECR repository to push your Docker images to."
  value       = aws_ecr_repository.app.repository_url
}

output "rds_instance_endpoint" {
  description = "The endpoint of the RDS database instance."
  value       = aws_db_instance.default.address
}

output "rds_instance_port" {
  description = "The port of the RDS database instance."
  value       = aws_db_instance.default.port
}

output "db_credentials_secret_arn" {
  description = "The ARN of the secret containing the database credentials."
  value       = aws_secretsmanager_secret.db_credentials.arn
}