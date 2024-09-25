# AWS SDK and S3

## Creating bucket

```bash
aws s3api create-bucket --bucket <bucket-name> --region <region> --create-bucket-configuration LocationConstraint=<region>
```

## List objects in bucket

```bash
aws s3 ls s3://<bucket-name>
```

## Download an object from bucket

```bash
aws s3 cp s3://<bucket-name>/<object-key> <local-file>
```
